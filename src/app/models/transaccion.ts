export type EstadoTransaccion = 'PENDIENTE' | 'ENVIANDO' | 'CONFIRMADA' | 'ERROR';

export interface Transaccion {
  idTransaccion: string;
  nombre: string;
  correo: string;
  producto: string;
  cantidad: number;
  fecha: string;
  estado: EstadoTransaccion;
}

export interface TransaccionRequest {
  idTransaccion: string;
  nombre: string;
  correo: string;
  producto: string;
  cantidad: number;
  fecha: string;
}

export interface TransaccionResponse {
  idTransaccion: string;
  estado: string;
  mensaje?: string;
}
