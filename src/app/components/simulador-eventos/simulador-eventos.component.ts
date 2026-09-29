import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoLog } from '../../models/evento-log';
import { Transaccion } from '../../models/transaccion';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-simulador-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulador-eventos.component.html',
  styleUrl: './simulador-eventos.component.scss'
})
export class SimuladorEventosComponent {
  readonly eventos$: Observable<EventoLog[]>;
  readonly historial$: Observable<Transaccion[]>;

  constructor(private readonly transaccionService: TransaccionService) {
    this.eventos$ = this.transaccionService.eventos$;
    this.historial$ = this.transaccionService.historial$;
  }

  limpiarLog(): void {
    this.transaccionService.limpiarLog();
  }

  iconoPorTipo(tipo: EventoLog['tipo']): string {
    switch (tipo) {
      case 'success':
        return '✔';
      case 'error':
        return '✖';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  }

  claseEstado(estado: Transaccion['estado']): string {
    return 'estado-' + estado.toLowerCase();
  }
}
