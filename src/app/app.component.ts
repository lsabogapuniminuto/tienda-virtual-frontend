import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioCompraComponent } from './components/formulario-compra/formulario-compra.component';
import { SimuladorEventosComponent } from './components/simulador-eventos/simulador-eventos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioCompraComponent, SimuladorEventosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Tienda Virtual Uniminuto';
}
