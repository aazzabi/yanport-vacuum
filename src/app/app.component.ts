import {Component, OnInit} from '@angular/core';

class Matrix {
  x: number;
  y: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vacuum-yanport';
  x: number;
  y: number;
  maximumX: number;
  maximumY: number;
  map: Matrix;
  arrayY = [];
  arrayX = [];
  orientation: '';

  ngOnInit(): void {
  }

  change() {
    // @ts-ignore
    this.arrayX = Array(this.maximumX).fill().map((x, i) => i); // [0,1,2,3,4]
    // @ts-ignore
    this.arrayY = Array(this.maximumY).fill().map((x, i) => i); // [0,1,2,3,4]
    this.checkX();
    this.checkY();
  }

  checkY() {
    if (this.y > this.maximumY) {
      this.y = this.maximumY;
    }
  }
  checkX() {
    if (this.x > this.maximumX) {
      this.x = this.maximumX;
    }
  }
}
