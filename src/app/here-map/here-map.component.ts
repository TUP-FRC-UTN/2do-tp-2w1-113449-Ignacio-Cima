import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { Marcador } from '../interfaces/marcador';
import { marcadorEstado } from '../interfaces/marcadorEstado';
import { MarcadorProvider } from '../providers/marcador.provider';


@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

  private map?: H.Map;
  marcadores: Marcador[] = [];
  @ViewChild('map') mapDiv?: ElementRef;

  lat: number = 0;
  lng: number = 0;
  @Input() public zoom = 10;
  count: number = 0;

  LocationOfMarker = { lat: this.lat, lng: this.lng };
  marker = new H.map.Marker(this.LocationOfMarker);
  icon = new H.map.Icon('xmlns="http://www.w3.org/2000/svg%22%3E');


  constructor(private marcador: MarcadorProvider) { }

  //Generador de mapa
  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      const platform = new H.service.Platform({
        apikey: '{Hi54KyU-U_pTeVwDRxCQwohwrwwq1-vtNlkyFjsjv1M}'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: -31.399084, lng: -64.334431},
          zoom: 10,
        },
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
    }
  }

  //Capta el evento de cambio de valor en el input zoom de mappossition desde el app.component
  ngOnChanges(changes: SimpleChanges) {
    if (this.map) {
      if (changes['zoom'] !== undefined) {
        this.map.setZoom(changes['zoom'].currentValue);
      }
    }
  }

  //Obtiene el arreglo de coordenadas a traves del marcadorProvider
  getMarcadores(){
    this.marcador.getMarcador().subscribe({
      next: (r: marcadorEstado) => {this.marcadores = r.listaMarcadores; },
      error: (e) => console.error(e),
      complete: () => console.info('Petición completa')
    })

  }

  //Setea la latitud y longirud con los valores del arreglo, modifica la posicion del mapa y del marcador
  setCenter(){
    this.lat = this.marcadores[this.count].latitud;
    this.lng = this.marcadores[this.count].longitud;

    this.LocationOfMarker = { lat: this.lat, lng: this.lng };

    this.marker.setGeometry( this.LocationOfMarker);

    this.map?.setCenter({lat: this.lat, lng: this.lng})

    this.map?.addObject(this.marker);

    if(this.count == (this.marcadores.length - 1)){
      this.count = 0;
    }
    else{
      this.count ++;
    }

  }

  //Ejecuta la petición a la API automáticamente una vez
  ngOnInit(): void {
    this.getMarcadores();
  }
  


}
