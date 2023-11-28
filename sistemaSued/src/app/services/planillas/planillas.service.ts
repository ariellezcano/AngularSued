import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanillasService {

  api: string;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Planillas';
  }

  getListHomicidioDoloso(fecha1: any, fecha2: any) {
    return this.http.get( `${this.api}/homicidioDoloso/${fecha1},${fecha2}`);
  }

  getSuicidio(fecha1: any, fecha2: any, tipo: number) {
    return this.http.get( `${this.api}/suicidio/${fecha1},${fecha2},${tipo}`);
  }

  getMuertesViales(fecha1: any, fecha2: any) {
    return this.http.get( `${this.api}/muertesViales/${fecha1},${fecha2}`);
  }

  getDelPropiedad(fecha1: any, fecha2: any) {
    return this.http.get( `${this.api}/DelitosContraPropiedad/${fecha1},${fecha2}`);
  }

  getHechoDelictivo(fecha1: any, fecha2: any) {
    return this.http.get( `${this.api}/hechosDelictivos/${fecha1},${fecha2}`);
  }
}
