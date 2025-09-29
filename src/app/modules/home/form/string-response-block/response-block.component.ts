import { Component, inject, signal, OnInit } from '@angular/core';
import { TranslatorService } from '../../../../services/translator.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'string-response-block',
  imports: [JsonPipe],
  templateUrl: './response-block.component.html',
  styleUrl: './response-block.component.css',
  standalone: true,
})
export class StringResponseBlockComponent implements OnInit {
  response = signal<string>('');

  service = inject(TranslatorService);

  ngOnInit(): void {
    this.service
      .currentResponseAsObservable()
      .subscribe((res) => this.response.set(res));
  }
}
