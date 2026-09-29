import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, concatMap, delay, tap } from 'rxjs/operators';
import { EventoLog, TipoEvento } from '../models/evento-log';
import { Transaccion, TransaccionRequest, TransaccionResponse } from '../models/transaccion';

const API_URL = 'http://localhost:8080/api/v1/transacciones';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private readonly eventosSubject = new BehaviorSubject<EventoLog[]>([]);
  readonly eventos$ = this.eventosSubject.asObservable();

  private readonly historialSubject = new BehaviorSubject<Transaccion[]>([]);
  readonly historial$ = this.historialSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  generarIdTransaccion(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return 'txn-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  registrarEvento(tipo: TipoEvento, mensaje: string, idTransaccion?: string): void {
    const evento: EventoLog = {
      timestamp: new Date().toISOString(),
      tipo,
      mensaje,
      idTransaccion
    };
    this.eventosSubject.next([...this.eventosSubject.value, evento]);
  }

  limpiarLog(): void {
    this.eventosSubject.next([]);
  }

  procesarCompra(datos: { nombre: string; correo: string; producto: string; cantidad: number }): Observable<TransaccionResponse> {
    const idTransaccion = this.generarIdTransaccion();
    const fecha = new Date().toISOString();

    const request: TransaccionRequest = {
      idTransaccion,
      fecha,
      ...datos
    };

    this.registrarEvento('info', 'Validando datos del formulario...', idTransaccion);

    return of(null).pipe(
      delay(300),
      tap(() => this.registrarEvento('info', `ID de transacción generado: ${idTransaccion}`, idTransaccion)),
      delay(300),
      tap(() => this.actualizarHistorial({ ...request, estado: 'ENVIANDO' })),
      tap(() => this.registrarEvento('info', `Enviando transacción a ${API_URL}...`, idTransaccion)),
      delay(400),
      concatMap(() => this.http.post<TransaccionResponse>(API_URL, request)),
      tap((respuesta) => {
        this.registrarEvento('success', `Transacción confirmada por el backend (estado: ${respuesta.estado ?? 'OK'})`, idTransaccion);
        this.actualizarHistorial({ ...request, estado: 'CONFIRMADA' });
      }),
      catchError((error: HttpErrorResponse) => {
        const mensaje = error.status === 0
          ? 'No se pudo conectar con el backend (http://localhost:8080). Verifica que el servicio Spring Boot esté activo.'
          : `Error del backend (${error.status}): ${error.error?.mensaje ?? error.message}`;
        this.registrarEvento('error', mensaje, idTransaccion);
        this.actualizarHistorial({ ...request, estado: 'ERROR' });
        throw error;
      })
    );
  }

  private actualizarHistorial(datos: TransaccionRequest & { estado: Transaccion['estado'] }): void {
    const historial = this.historialSubject.value;
    const index = historial.findIndex((t) => t.idTransaccion === datos.idTransaccion);
    const transaccion: Transaccion = { ...datos };

    if (index >= 0) {
      const copia = [...historial];
      copia[index] = transaccion;
      this.historialSubject.next(copia);
    } else {
      this.historialSubject.next([transaccion, ...historial]);
    }
  }
}
