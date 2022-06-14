import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  zoom: number;

  constructor() {
    this.zoom = 10;
  }

  //Capta el evento de cambio de valor del input zoom y modifica el valor de la propiedad zoom
  handleInputChange(event: Event) {
    const target = <HTMLInputElement> event.target;
    if (target) {
      if (target.name === 'zoom') {
        this.zoom = parseFloat(target.value);
      }
    }
  }

}
