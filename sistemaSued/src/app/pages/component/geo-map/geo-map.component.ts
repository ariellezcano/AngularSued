import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Map } from 'maplibre-gl';
import { Preventivo } from 'src/app/models/index.models';
import { GeolocalizacionService } from 'src/app/services/index.service';

@Component({
  selector: 'app-geo-map',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
})
export class GeoMapComponent implements OnInit, AfterViewInit {
  
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  private map!: Map;

  @Input()
  latitud: any;
  @Input()
  longitud: any;

  constructor(private wsdlGeo: GeolocalizacionService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const myAPIKey = this.wsdlGeo.apiKey;
    const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';

    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4,
    };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  coordenada(event: Preventivo) {
    if (event != undefined) {
      this.latitud = event.latitud;
      this.longitud = event.longitud;
    }
  }
}
