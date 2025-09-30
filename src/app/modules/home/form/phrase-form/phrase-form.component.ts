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
import { TranslatorService } from '../../../../services/translator.service';
import { GetTranslation } from '../../../../models/GetTranslation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StringResponseBlockComponent } from '../string-response-block/response-block.component';
import { GetLanguages } from '../../../../models/GetLanguages';

@Component({
  selector: 'phrase-form',
  imports: [ReactiveFormsModule, StringResponseBlockComponent],
  templateUrl: './phrase-form.component.html',
  styleUrl: './phrase-form.component.css',
})
export class PhraseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TranslatorService);
  private destroyRef = inject(DestroyRef);

  @Input({required: true}) languages: GetLanguages[] = [];
  phraseTranslationResult = signal<string>('');

  phraseForm!: FormGroup<{
    phrase: FormControl<string | null>;
    language: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.phraseForm = this.fb.group({
      phrase: this.fb.control('', { validators: [Validators.required] }),
      language: this.fb.control('', { validators: [Validators.required] }),
    });
  }

  onSubmit(): void {
    if (this.phraseForm.invalid) return;
    const request = this.phraseForm.getRawValue() as GetTranslation;

    this.service
      .getTranslation(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => this.phraseTranslationResult.set(response));
  }
}
