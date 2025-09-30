import { Component, input, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'string-response-block',
  imports: [JsonPipe],
  templateUrl: './response-block.component.html',
  styleUrl: './response-block.component.css',
  standalone: true,
})
export class StringResponseBlockComponent {
  @Input({required: true}) response = '';
  @Input() isJson = false;
}
