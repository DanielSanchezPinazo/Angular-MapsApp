import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker,
  color: string
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild("map")
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];
  public map?: Map;
  public lngLat: LngLat = new LngLat(-4.43, 36.72);

  ngAfterViewInit(): void {

    if (!this.divMap) throw "El elemento HTML no se encuentra.";

    this.map = new Map({

      container: this.divMap.nativeElement, // container ID

      style: 'mapbox://styles/mapbox/streets-v12', // style URL

      center: this.lngLat, // starting position [lng, lat]

      zoom: 13, // starting zoom
    });

    // const markerHTML = document.createElement("div");
    // markerHTML.innerHTML = "Daniel Sánchez";


    // const marker: Marker = new Marker({
    //   color: "blue",
    //   element: markerHTML
    // })
    // .setLngLat( [-4.5, 36.7] )
    // .addTo( this.map );
  }

  createMarker() {

    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker(lngLat: LngLat, color: string = "red") {

    if ( !this.map ) return;

    const marker: Marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push( {marker, color} );
  }

  deleteMarker( index: number ) {

    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
  }

  flyTo( marker: Marker ) {

    if ( !this.map ) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

}
