import { Component, inject, OnInit } from '@angular/core';
import { ResponseBlockComponent } from './response-block/response-block.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetTranslation } from '../../../models/GetTranslation';
import { TranslatorService } from '../../../services/translator.service';

@Component({
  selector: 'app-form',
  imports: [ResponseBlockComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
})
export class FormComponent implements OnInit {
  builder = inject(FormBuilder);
  service = inject(TranslatorService)

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.builder.group({
      ['phrase']: new FormControl(''),
      ['language']: new FormControl(''),
    });
  }

  onSubmit() {
    const request = this.form.value as GetTranslation;

    this.service.getTranslation(request).subscribe((res) => {
      console.log(res)
    })

  }
}
