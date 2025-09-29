import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { GetLanguages } from '../../../models/GetLanguages';
import { GetTranslation } from '../../../models/GetTranslation';
import { TranslatorService } from '../../../services/translator.service';
import { StringResponseBlockComponent } from './string-response-block/response-block.component';
import { JsonResponseBlockComponent } from './json-response-block/json-response-block.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StringResponseBlockComponent,
    JsonResponseBlockComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TranslatorService);
  private destroyRef = inject(DestroyRef);

  languages = signal<GetLanguages[]>([]);
  translationResult = signal<GetTranslation | null>(null);
  jsonTranslationResult = signal<string>('');

  form!: FormGroup<{
    phrase: FormControl<string | null>;
    language: FormControl<string | null>;
  }>;
  jsonForm!: FormGroup<{
    jsonInput: FormControl<string | null>;
    language: FormControl<string | null>;
  }>;

  activeTab = signal<'phrase' | 'json'>('phrase');

  ngOnInit(): void {
    this.form = this.fb.group({
      phrase: this.fb.control('', { validators: [Validators.required] }),
      language: this.fb.control('', { validators: [Validators.required] }),
    });

    this.jsonForm = this.fb.group({
      jsonInput: this.fb.control('', { validators: [Validators.required] }),
      language: this.fb.control('', { validators: [Validators.required] }),
    });

    this.loadLanguages();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const request = this.form.getRawValue() as GetTranslation;

    this.service
      .getTranslation(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onSubmitJson(): void {
    if (this.jsonForm.invalid) return;

    try {
      const jsonObject = JSON.parse(this.jsonForm.value.jsonInput || '{}');
      const lang = this.jsonForm.value.language!;

      this.service
        .translateJson(jsonObject, lang)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => this.jsonTranslationResult.set(res));
    } catch (err) {
      console.error('JSON inválido', err);
    }
  }

  private loadLanguages(): void {
    this.service
      .getLanguages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.languages.set(res));
  }
}
