export type TipoEvento = 'info' | 'success' | 'warning' | 'error';

export interface EventoLog {
  timestamp: string;
  tipo: TipoEvento;
  mensaje: string;
  idTransaccion?: string;
}
