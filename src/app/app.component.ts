import { Component } from '@angular/core';

import { HomeComponent } from './modules/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'frontend-translator-ai';
}
