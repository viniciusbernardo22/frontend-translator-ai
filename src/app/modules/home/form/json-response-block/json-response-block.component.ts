import { Component, viewChild, signal } from '@angular/core';
import { FormComponent } from '../form.component';

@Component({
  selector: 'json-response-block',
  imports: [],
  templateUrl: './json-response-block.component.html',
  styleUrl: './json-response-block.component.css'
})
export class JsonResponseBlockComponent {

  response= viewChild.required(FormComponent);
}
