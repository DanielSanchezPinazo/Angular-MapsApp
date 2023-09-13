import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild( "map" )
  public divMap?: ElementRef;

  public zoom: number = 4;
  public map?: Map;
  public lngLat: LngLat = new LngLat( -5, 40 );

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw "El elemento HTML no se encuentra.";

    this.map = new Map({

      container: this.divMap.nativeElement, // container ID

      style: 'mapbox://styles/mapbox/streets-v12', // style URL

      center: this.lngLat, // starting position [lng, lat]

      zoom: this.zoom, // starting zoom

      });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {

    if ( !this.map ) throw "Mapa no inicializado.";
// recuperamos el zoom del mapa
    this.map.on( "zoom", (ev) => this.zoom = this.map!.getZoom());
// si el zoom es mayor que 18 vuelve a 18
    this.map.on( "zoomend", () => {

      if ( this.map!.getZoom() > 18 ) this.map!.zoomTo( 18 )
    });
// si el zoom es menor que 0 vuelve a 2
    this.map.on( "zoomend", () => {

      if ( this.map!.getZoom() < 2 ) this.map!.zoomTo( 2 );
    });
// recupera la longitud y latitud
    this.map.on( "move", () => {
      this.lngLat = this.map!.getCenter();
      console.log(this.lngLat);

    })
  }

  zoomIn() {

    this.map?.zoomIn();
  }

  zoomOut() {

    this.map?.zoomOut();
  }
// método para conectar con la barra del input
  zoomChanged( value: string ) {

    this.zoom = Number( value );
    this.map?.zoomTo( this.zoom );
  }

}
