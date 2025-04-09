import { Component } from '@angular/core';
import { Ejercicio } from '../models/ejercicio';
import { Rutina } from '../models/rutina';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  exercise: Ejercicio = {
    name: '',
    sets: 0,
    reps: 0,
    pause: {
      min: 0,
      sec: 0,
    },
    weight: 0,
  };
  rutina: Rutina = new Rutina('Mi rutina', []);

  // Datos de los selects del formulario
  sets: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  reps: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  minutes: number[] = Array.from({ length: 6 }, (_, i) => i);
  seconds: number[] = Array.from({ length: 60 }, (_, i) => i); // 0 a 59

  onNewExercise() {
    this.rutina.ejercicios.push({ ...this.exercise });
    console.log(this.rutina);
  }

  onSubmit() {
    console.log('Nuevo ejercicio guardado: ', this.exercise);
  }

  onSaveRoutine() {
    const rutinaJson = JSON.stringify(this.rutina, null, 2);
    const blob = new Blob([rutinaJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.rutina.name || 'rutina'}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.rutina.name = this.rutina.name;
  }
}
