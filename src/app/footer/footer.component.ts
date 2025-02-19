import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  nombre: string = 'Guía de Turismo';
  curso: string = 'Desarrollo de Aplicaciones Web';
  fechaActual: Date = new Date();
}
