import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'home',
  imports: [HeaderComponent, FormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

  appName = "Translator AI"

}
