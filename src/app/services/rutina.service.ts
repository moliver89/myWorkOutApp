import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RutinaService {
  private rutina: any = null;

  setRutina(r: any) {
    this.rutina = r;
  }

  getRutina() {
    return this.rutina;
  }

  clearRutina() {
    this.rutina = null;
  }
}
