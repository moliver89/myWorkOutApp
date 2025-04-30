import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../models/rutina';
import { RutinaService } from '../services/rutina.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private rutinaService: RutinaService
  ) {}

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
      // Guardamos la rutina en el servicio antes de navegar
      this.rutinaService.setRutina(this.rutinaSeleccionada);
      // La guardamos en Local Storage para no perderla al actualizar
      localStorage.setItem('rutina', JSON.stringify(this.rutinaSeleccionada));
      // Navegamos
      this.router.navigate(['/showrutine']);
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
        // Leemos y parseamos el archivo de rutina cargado
        const json = JSON.parse(reader.result as string);
        this.rutina = new Rutina(json.name, json.ejercicios);
        this.rutinaSeleccionada = this.rutina;
        // Guardamos la rutina antes de navegar
        this.rutinaService.setRutina(this.rutinaSeleccionada);
        // La guardamos en Local Storage
        localStorage.setItem('rutina', JSON.stringify(this.rutinaSeleccionada));
        // Navegamos
        this.router.navigate(['/showrutine']);
      } catch (error) {
        console.error('Error al cargar el archivo JSON', error);
      }
    };

    reader.readAsText(file);
  }
}
