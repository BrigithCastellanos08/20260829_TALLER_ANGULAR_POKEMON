import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscadorPokemon } from './buscador-pokemon';

describe('BuscadorPokemon', () => {
  let component: BuscadorPokemon;
  let fixture: ComponentFixture<BuscadorPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorPokemon]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BuscadorPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
