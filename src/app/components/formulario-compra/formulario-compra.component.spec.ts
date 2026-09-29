import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCompraComponent } from './formulario-compra.component';

describe('FormularioCompraComponent', () => {
  let component: FormularioCompraComponent;
  let fixture: ComponentFixture<FormularioCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCompraComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
