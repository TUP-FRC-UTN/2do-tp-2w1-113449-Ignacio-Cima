import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mapposition',
  templateUrl: './mapposition.component.html',
  styleUrls: ['./mapposition.component.css']
})
export class MappositionComponent implements OnInit {

  @Output() notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }



}
