import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetLanguages } from '../../../../models/GetLanguages';
import { TranslatorService } from '../../../../services/translator.service';
import { StringResponseBlockComponent } from '../string-response-block/response-block.component';

@Component({
  selector: 'json-form',
  standalone: true,
  imports: [ReactiveFormsModule, StringResponseBlockComponent],
  templateUrl: './json-form.component.html',
  styleUrl: './json-form.component.css',
})
export class JsonFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TranslatorService);
  private destroyRef = inject(DestroyRef);

  @Input({ required: true }) languages: GetLanguages[] = [];

  jsonForm!: FormGroup<{
    jsonInput: FormControl<string | null>;
    language: FormControl<string | null>;
  }>;

  jsonTranslationResult = signal<any>(null);

  ngOnInit(): void {
    this.jsonForm = this.fb.group({
      jsonInput: this.fb.control('', { validators: [Validators.required] }),
      language: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  onSubmitJson(): void {
    if (this.jsonForm.invalid) return;

    try {
      const jsonObject = JSON.parse(this.jsonForm.value.jsonInput || '{}');
      const lang = this.jsonForm.value.language!;
      this.service
        .translateJson(jsonObject, lang)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          let parsed: any;
          try {
            const unescaped = JSON.parse(res);
            parsed =
              typeof unescaped === 'string' ? JSON.parse(unescaped) : unescaped;
          } catch {
            parsed = res;
          }

          this.jsonTranslationResult.set(parsed);
        });
    } catch (err) {
      console.error('JSON inválido', err);
    }
  }
}
