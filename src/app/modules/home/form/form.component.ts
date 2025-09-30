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
import { TranslatorService } from '../../../services/translator.service';
import { JsonFormComponent } from './json-form/json-form.component';
import { PhraseFormComponent } from './phrase-form/phrase-form.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, PhraseFormComponent, JsonFormComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private service = inject(TranslatorService);
  private destroyRef = inject(DestroyRef);

  languages = signal<GetLanguages[]>([]);
  activeTab = signal<'phrase' | 'json'>('phrase');

  ngOnInit(): void {
    this.loadLanguages();
  }

  private loadLanguages(): void {
    this.service
      .getLanguages()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.languages.set(res));
  }
}
