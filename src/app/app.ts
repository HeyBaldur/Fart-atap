import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FartsComponent } from './modules/farts/farts.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FartsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FartAttack');
}
