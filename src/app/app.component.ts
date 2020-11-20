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
  x: any;
  y: any;
  maximumX: number;
  maximumY: number;
  map: Matrix;
  arrayY = [];
  arrayX = [];
  orientation: '';
  instructions: '';

  ngOnInit(): void {
  }

  change() {
    // @ts-ignore
    this.arrayX = Array(this.maximumX).fill().map((x, i) => i); // [0,1,2,3,4]
    // @ts-ignore
    this.arrayY = Array(this.maximumY).fill().map((x, i) => i); // [0,1,2,3,4]
    this.changeXandY();
  }

  changeXandY() {
    if (this.y > this.maximumY) {
      this.y = this.maximumY;
    }
    if (this.x > this.maximumX) {
      this.x = this.maximumX;
    }
    if (this.orientation) {
      this.setVacuum();
    }
  }

  setVacuum() {
    this.emptyMap();
    this.arrayX.forEach((i) => {
      if (i === this.x) {
        this.arrayY.forEach(j => {
          if (j === this.y) {
            this.initializeOrientationVacuum(i, j);
          }
        });
      }
    });
  }

  initializeOrientationVacuum(i: number, j: number) {
    const firstPosition = document.getElementById(i + '-' + j);
    if ( this.orientation === 'N' ) {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-down"></i>';
    } else if ( this.orientation === 'E' ) {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-left"></i>';
    } else if ( this.orientation === 'W' ) {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-right"></i>';
    } else if ( this.orientation === 'S' ) {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-up"></i>';
    }
  }
  emptyMap() {
    this.arrayX.forEach((i) => {
        this.arrayY.forEach(j => {
          document.getElementById(i + '-' + j).innerText = '';
        });
    });

  }
  go() {
  }

}
