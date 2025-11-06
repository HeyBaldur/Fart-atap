import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import Two from 'two.js';

@Component({
  selector: 'app-farts',
  templateUrl: './farts.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FartsComponent implements OnInit, AfterViewInit, OnDestroy {
  soundMap: { [key: string]: string } = {
    q: 'sounds/farts/1.mp3',
    w: 'sounds/farts/2.mp3',
    e: 'sounds/farts/3.mp3',
    r: 'sounds/farts/4.mp3',
    t: 'sounds/farts/5.mp3',
    y: 'sounds/farts/6.mp3',
    u: 'sounds/farts/7.mp3',
    i: 'sounds/farts/8.mp3',
    o: 'sounds/farts/9.mp3',
    p: 'sounds/farts/10.mp3',
    a: 'sounds/farts/11.mp3',
    s: 'sounds/farts/12.mp3',
    d: 'sounds/farts/13.mp3',
    f: 'sounds/farts/14.mp3',
    g: 'sounds/farts/15.mp3',
    h: 'sounds/farts/16.mp3',
    j: 'sounds/farts/17.mp3',
    k: 'sounds/farts/18.mp3',
    l: 'sounds/farts/19.mp3',
    z: 'sounds/farts/20.mp3',
    x: 'sounds/farts/21.mp3',
    c: 'sounds/farts/22.mp3',
    v: 'sounds/farts/23.mp3',
    b: 'sounds/farts/24.mp3',
    n: 'sounds/farts/25.mp3',
    m: 'sounds/farts/26.mp3',
  };

  visualMap: { [key: string]: any } = {
    q: { type: 'circle', color: '#900C3F' },
    w: { type: 'circle', color: '#33FF57' },
    e: { type: 'circle', color: '#FFC300' },
    r: { type: 'circle', color: '#FF5733' },
    t: { type: 'circle', color: '#C70039' },
    y: { type: 'circle', color: '#3357FF' },
    u: { type: 'circle', color: '#DAF7A6' },
    i: { type: 'circle', color: '#FFC300' },
    o: { type: 'circle', color: '#900C3F' },
    p: { type: 'circle', color: '#33FF57' },
    a: { type: 'circle', color: '#FF5733' },
    s: { type: 'circle', color: '#3357FF' },
    d: { type: 'circle', color: '#DAF7A6' },
    f: { type: 'circle', color: '#900C3F' },
    g: { type: 'circle', color: '#C70039' },
    h: { type: 'circle', color: '#FFC300' },
    j: { type: 'circle', color: '#33FF57' },
    k: { type: 'circle', color: '#FF5733' },
    l: { type: 'circle', color: '#900C3F' },
    z: { type: 'circle', color: '#3357FF' },
    x: { type: 'circle', color: '#DAF7A6' },
    c: { type: 'circle', color: '#FFC300' },
    v: { type: 'circle', color: '#C70039' },
    b: { type: 'circle', color: '#33FF57' },
    n: { type: 'circle', color: '#FF5733' },
    m: { type: 'circle', color: '#900C3F' },
  };

  @ViewChild('twoCanvasContainer') container!: ElementRef;
  private two!: Two;
  private activeShapes: any[] = [];
  private availableKeys: string[] = [];

  constructor() {}

  ngOnInit() {
    this.availableKeys = Object.keys(this.soundMap);
  }

  ngAfterViewInit() {
    const containerElement = this.container.nativeElement;
    const params = {
      width: containerElement.clientWidth,
      height: containerElement.clientHeight,
    };

    this.two = new Two(params).appendTo(containerElement);
    this.two.bind('update', () => {
      for (let i = this.activeShapes.length - 1; i >= 0; i--) {
        const shape = this.activeShapes[i];
        shape.scale += 0.4;
        shape.opacity -= 0.01;
        if (shape.opacity <= 0) {
          this.two.remove(shape);
          this.activeShapes.splice(i, 1);
        }
      }
    });
    this.two.play();
  }

  ngOnDestroy() {
    this.two.pause();
    this.two.clear();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    this.triggerEvent(key);
  }

  @HostListener('window:click', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  handleScreenInteraction(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      return;
    }

    if (this.availableKeys.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.availableKeys.length);
    const randomKey = this.availableKeys[randomIndex];
    this.triggerEvent(randomKey);
  }

  triggerEvent(key: string) {
    if (this.soundMap[key] && this.visualMap[key]) {
      this.playSound(key);
      this.showVisual(key);
    }
  }

  playSound(key: string) {
    const soundFile = this.soundMap[key];

    if (soundFile) {
      const audio = new Audio();
      audio.src = soundFile;
      audio.load();
      audio.play();
    }
  }

  showVisual(key: string) {
    const visual = this.visualMap[key];
    if (!visual) return;
    const x = Math.random() * this.two.width;
    const y = Math.random() * this.two.height;
    let shape;

    if (visual.type === 'circle') {
      shape = this.two.makeCircle(x, y, 50);
    } else if (visual.type === 'rect') {
      shape = this.two.makeRectangle(x, y, 100, 100);
    }

    if (shape) {
      shape.fill = visual.color;
      shape.noStroke();
      shape.scale = 0;
      shape.opacity = 1;
      this.activeShapes.push(shape);
    }
  }
}
