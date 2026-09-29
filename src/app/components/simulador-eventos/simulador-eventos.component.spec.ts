import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorEventosComponent } from './simulador-eventos.component';

describe('SimuladorEventosComponent', () => {
  let component: SimuladorEventosComponent;
  let fixture: ComponentFixture<SimuladorEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimuladorEventosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimuladorEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
