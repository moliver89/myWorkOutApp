import { Ejercicio } from './ejercicio';

export class Rutina {
  public name: string;
  public ejercicios: Ejercicio[];

  constructor(name: string, ejercicios: Ejercicio[]) {
    this.name = name;
    this.ejercicios = ejercicios;
  }
}
