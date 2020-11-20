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
    if (this.y >= this.maximumY) {
      this.y = this.maximumY - 1;
    }
    if (this.x >= this.maximumX) {
      this.x = this.maximumX - 1;
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

  go() {
    for (const v of this.instructions) {
      this.doActionVacuum(v);
    }
    console.log('*********FINAL************');
    console.log('(' + this.x + ',' + this.y + ') : ' + this.orientation);
  }

  doActionVacuum(v: any) {
    console.log('****', v)
    if (v === 'D') {
      this.doRotationD();
      console.log('rot D')
      console.log('(' + this.x + ',' + this.y + ') : ' + this.orientation);
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    } else if (v === 'G') {
      this.doRotationG();
      console.log('rot G')
      console.log('(' + this.x + ',' + this.y + ') : ' + this.orientation);
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    } else if (v === 'A') {
      this.doMove();
      console.log('(' + this.x + ',' + this.y + ') : ' + this.orientation);
      this.setOrientationVacuum(this.x, this.y, this.orientation);
    }
  }

  doRotationD() {
    console.log('Rotate D');
    if (this.orientation === 'E') {
      this.orientation = 'S';
    } else if (this.orientation == 'N') {
      this.orientation = 'E';
    } else if (this.orientation === 'S') {
      this.orientation = 'W';
    } else if (this.orientation == 'W') {
      this.orientation = 'N';
    }
  }

  doRotationG() {
    console.log('Rotate G');
    if (this.orientation === 'E') {
      this.orientation = 'N';
    } else if (this.orientation == 'N') {
      this.orientation = 'W';
    } else if (this.orientation === 'S') {
      this.orientation = 'E';
    } else if (this.orientation == 'W') {
      this.orientation = 'S';
    }
  }

  doMove() {
    if ((this.orientation === 'E') && (this.x !== 0)) {
      this.x--;
    } else if ((this.orientation == 'N') && (this.y !== this.maximumY + 1)) {
      this.y++;
    } else if ((this.orientation == 'S') && (this.y !== 0)) {
      this.y--;
    } else if ((this.orientation == 'W') && (this.x !== this.maximumX + 1)) {
      this.x++;
    }
  }

  reformatInstruction() {
    const regexp = new RegExp('D*G*A*');
    console.log(regexp.test(this.instructions));
  }
}
