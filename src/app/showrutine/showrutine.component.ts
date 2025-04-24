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

  constructor(private rutinaService: RutinaService) {}

  ngOnInit(): void {
    this.rutina = this.rutinaService.getRutina();
  }
}
