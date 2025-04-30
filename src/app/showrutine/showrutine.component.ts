import { Component } from '@angular/core';
import { Rutina } from '../models/rutina';
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-showrutine',
  standalone: false,
  templateUrl: './showrutine.component.html',
  styleUrl: './showrutine.component.css',
})
export class ShowrutineComponent {
  rutina: Rutina | null = null;
  editEnable: boolean = false;
  rutinaEditada: boolean = false;
  constructor(private rutinaService: RutinaService) {}

  ngOnInit(): void {
    this.rutina = this.rutinaService.getRutina();

    // Si no esta en el servicio, intentamos recuperarla del LocalStorage
    if (!this.rutina) {
      const rutinaGuardada = localStorage.getItem('rutina');
      if (rutinaGuardada) {
        this.rutina = JSON.parse(rutinaGuardada);
      }
    }
  }

  onEdit() {
    this.editEnable = true;
  }
  onEditDone() {
    this.editEnable = false;
    if (this.rutina) {
      localStorage.setItem('rutina', JSON.stringify(this.rutina));
    }
    this.rutinaEditada = true;
    console.log('Ejercicio editado');
  }
  descargarRutina() {
    const rutinaJson = JSON.stringify(this.rutina, null, 2);
    const blob = new Blob([rutinaJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.rutina!.name || 'rutina'}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
