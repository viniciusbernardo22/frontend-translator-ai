import { Component, inject, signal, OnInit } from '@angular/core';
import { TranslatorService } from '../../../../services/translator.service';

@Component({
  selector: 'app-response-block',
  imports: [],
  templateUrl: './response-block.component.html',
  styleUrl: './response-block.component.css',
  standalone: true,
})
export class ResponseBlockComponent implements OnInit {
  response = signal<string>('');

  service = inject(TranslatorService);

  ngOnInit(): void {
    this.service
      .currentResponseAsObservable()
      .subscribe((res) => this.response.set(res));
  }
}
