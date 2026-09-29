import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TransaccionService } from '../../services/transaccion.service';

@Component({
  selector: 'app-formulario-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-compra.component.html',
  styleUrl: './formulario-compra.component.scss'
})
export class FormularioCompraComponent {
  enviando = false;
  ultimoIdGenerado: string | null = null;
  mensajeExito: string | null = null;

  readonly productos = ['Camiseta', 'Taza', 'Gorra', 'Libreta', 'Sticker Pack'];

  readonly formulario;

  constructor(private readonly fb: FormBuilder, private readonly transaccionService: TransaccionService) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      producto: ['', [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  campoInvalido(campo: string): boolean {
    const control = this.formulario.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    this.mensajeExito = null;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { nombre, correo, producto, cantidad } = this.formulario.getRawValue();
    this.enviando = true;

    this.transaccionService
      .procesarCompra({
        nombre: nombre!.trim(),
        correo: correo!.trim(),
        producto: producto!,
        cantidad: Number(cantidad)
      })
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: (respuesta) => {
          this.ultimoIdGenerado = respuesta.idTransaccion;
          this.mensajeExito = `Compra registrada correctamente. ID: ${respuesta.idTransaccion}`;
          this.formulario.reset({ cantidad: 1 });
        },
        error: () => {
          // El error ya queda registrado en el log de eventos del servicio.
        }
      });
  }
}
