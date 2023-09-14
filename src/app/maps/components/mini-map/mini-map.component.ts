import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{

  @ViewChild( "map" )
  public divMap?: ElementRef;

  @Input()
  public lngLat?: [number, number];

  ngAfterViewInit() {
    if ( !this.divMap?.nativeElement ) throw "Element not found."
    if ( !this.lngLat ) throw "LngLat can`t be null."

    //map
    const map = new Map({

      container: this.divMap.nativeElement, // container ID

      style: 'mapbox://styles/mapbox/streets-v12', // style URL

      center: this.lngLat, // starting position [lng, lat]

      zoom: 15, // starting zoom

      interactive: false

      //dragpan para permitir que se pueda hacer zoom o no
    });
    //marker
    new Marker()
    .setLngLat( this.lngLat )
    .addTo( map );


  }

}
