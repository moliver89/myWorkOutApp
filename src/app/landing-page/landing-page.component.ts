import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../models/rutina';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  rutina: any;
  rutinasDisponibles: { nombre: string; archivo: string }[] = [];
  rutinaSeleccionada: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http
      .get<{ nombre: string; archivo: string }[]>(
        'assets/fixtures/rutinas.json'
      )
      .subscribe((body) => {
        this.rutinasDisponibles = body;
      });
  }

  seleccionarRutina(event: Event) {
    const target = event.target as HTMLSelectElement;
    const nombreArchivo = target.value;

    const ruta = `assets/fixtures/${nombreArchivo}`;
    this.http.get(ruta).subscribe((data) => {
      this.rutinaSeleccionada = data;
      console.log('Rutina cargada:', this.rutinaSeleccionada);
    });
  }

  onNewRoutine() {
    this.router.navigate(['/nuevarutina']);
  }

  cargarRutina(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        this.rutina = new Rutina(json.name, json.ejercicios);
        console.log('Rutina cargada:', this.rutina);
        this.rutinaSeleccionada = this.rutina;
      } catch (error) {
        console.error('Error al cargar el archivo JSON', error);
      }
    };

    reader.readAsText(file);
  }
}
