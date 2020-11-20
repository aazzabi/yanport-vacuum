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
  orientation: string;
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
    if (this.y >= this.maximumY) {
      this.y = this.maximumY - 1;
    }
    if (this.x >= this.maximumX) {
      this.x = this.maximumX - 1;
    }
    if (this.orientation) {
      this.setInitialVacuumPosition();
    }
  }

  setInitialVacuumPosition() {
    this.emptyMap();
    this.arrayX.forEach((i) => {
      if (i === this.x) {
        this.arrayY.forEach(j => {
          if (j === this.y) {
            this.setOrientationVacuum(i, j, this.orientation);
          }
        });
      }
    });
  }

  setOrientationVacuum(i: number, j: number, orientation: any) {
    const firstPosition = document.getElementById(i + '-' + j);
    if (orientation === 'N') {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-down"></i>';
    } else if (orientation === 'E') {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-left"></i>';
    } else if (orientation === 'W') {
      firstPosition.innerHTML = '<i class="fa fa-2x fa-arrow-right"></i>';
    } else if (orientation === 'S') {
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

  // GO button
  go() {
    this.setInitialVacuumPosition();
    // parcourir l'instruction à executer
    for (const v of this.instructions) {
      this.doActionVacuum(v);
    }
    alert(' (x,y) = (' + this.x + ',' + this.y + ') , Orientation ' + this.orientation);
  }

  doActionVacuum(v: any) {
    if (v === 'D') {
      this.doRotation('D', this.orientation);
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    } else if (v === 'G') {
      this.doRotation('G', this.orientation);
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    } else if (v === 'A') {
      this.doMove();
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    }
  }

  doRotation(direction: any, o: any) {
    if (direction === 'D') {
      if (o === 'E') {
        this.orientation = 'S';
      } else if (o === 'N') {
        this.orientation = 'E';
      } else if (o === 'S') {
        this.orientation = 'W';
      } else if (o === 'W') {
        this.orientation = 'N';
      }
    } else if (direction === 'G') {
      if (o === 'E') {
        this.orientation = 'N';
      } else if (o === 'N') {
        this.orientation = 'W';
      } else if (o === 'S') {
        this.orientation = 'E';
      } else if (o === 'W') {
        this.orientation = 'S';
      }
    }
  }

  doMove() {
    if ((this.orientation === 'E') && (this.x !== 0)) {
      this.x--;
    } else if ((this.orientation === 'N') && (this.y + 1 !== this.maximumY)) {
      this.y++;
    } else if ((this.orientation === 'S') && (this.y !== 0)) {
      this.y--;
    } else if ((this.orientation === 'W') && (this.x + 1 !== this.maximumX)) {
      this.x++;
    }
  }

  reformatInstruction() {
    if (this.instructions) {
      for (const v of this.instructions) {
        if ((v !== 'A') && (v !== 'G') && (v !== 'D')) {
          this.instructions = this.instructions.replace(v, '');
        }
      }
    }
  }
}
