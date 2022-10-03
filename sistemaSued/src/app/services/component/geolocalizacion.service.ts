import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GeolocalizacionService {
  api: string;

  apiKey: string = 'a64f2d66b06b4d78a08cd9c5f38e7d38';

  constructor(private http: HttpClient) {
    this.api = environment.URLGeolocalizacion;
  }

  async geolocalizacion(
    calle: any,
    nro: number,
    cp: any,
    localidad: any,
    pais: any
  ) {
    var requestOptions = {
      method: 'GET',
    };
    let data = this.api+calle +','+nro +','+cp +','+localidad +','+pais+'&format=json&apiKey='+this.apiKey;
    console.log("datass", data)
    return (
      fetch(
        data,
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Server response wasn't OK");
          }
        })
        //.then(result => console.log(result))
        .catch((error) => console.log('error', error))
    );
  }

  obtenerGeo(lat: any, lon: any) {
    return fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=`+this.apiKey)
      .then((response) =>  response.json())
      .then((result) => {
        if (result.features.length) {
          Swal.fire(result.features[0].properties.formatted);
        } else {
          console.log('No address found');
        }
      });
  }
}

