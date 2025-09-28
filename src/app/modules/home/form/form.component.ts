import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ResponseBlockComponent } from './response-block/response-block.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetTranslation } from '../../../models/GetTranslation';
import { TranslatorService } from '../../../services/translator.service';
import { GetLanguages } from '../../../models/GetLanguages';
import { Subject, take } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [ResponseBlockComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
})
export class FormComponent implements OnInit {
  builder = inject(FormBuilder);
  service = inject(TranslatorService);

  languages = signal<GetLanguages[]>([]);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.builder.group({
      phrase: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
    });

    this.getLanguages();
  }

  onSubmit() {
    if (!this.form.valid) return;

    const request = this.form.value as GetTranslation;

    this.service
      .getTranslation(request)
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
      });
  }

  getLanguages() {
    this.service
      .getLanguages()
      .pipe(take(1))
      .subscribe((response) => {
        this.languages.set(response);
        console.log(response);
      });
  }
}
