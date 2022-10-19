import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GeolocalizacionService } from 'src/app/services/index.service';
import { Map } from "maplibre-gl";
import L from 'leaflet';

@Component({
  selector: 'app-geo-localizacion-inversa',
  templateUrl: './geo-localizacion-inversa.component.html',
  styleUrls: ['./geo-localizacion-inversa.component.scss'],
})
export class GeoLocalizacionInversaComponent implements OnInit {

  constructor(private wsdlGeo: GeolocalizacionService) {}

  apiKey = this.wsdlGeo.apiKey;
  ngOnInit(): void {
  }

   mymap = L.map('mapid').setView([51.213826, 4.453636], 16);

  onMapClick(e: any) {
    // user clicked on a map
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}&apiKey=YOUR_API_KEY`)
    .then(response => response.json())
    .then(result => {
      if (result.features.length) {
        const address = result.features[0].properties.formatted;
        L.popup().setLatLng(e.latlng).setContent(address).openOn(this.mymap);
      } else {
        L.popup().setLatLng(e.latlng).setContent("No address found").openOn(this.mymap);
      }
    });
  }
}
