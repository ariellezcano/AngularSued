import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreventivoService {
  other_header: any;
  api: any;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'Preventivo';
  }

  getFindId(id: any) {
    this.other_header = this.other_header;
    return this.http
      .get(this.api + '/' + id, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  getList(page: any, cantidad: any) {
    this.other_header = this.other_header;
    return this.http
      .get(this.api + '/paginate/' + page + ',' + cantidad)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doInsert(evento: object) {
    this.other_header = this.other_header;
    return this.http
      .post(this.api, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        console.log('ERROR', err);
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doUpdate(id: any, evento: any) {
    this.other_header = this.other_header;

    return this.http
      .put(this.api + '/' + id, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        console.log(err);
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doDelete(id: number, usuario: any) {
    this.other_header = this.other_header;
    return this.http
      .delete(this.api + '/' + id + "," + usuario, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doFilter(criterio: any) {
    this.other_header = this.other_header;
    const ruta = this.api + '/' + 'filterPreventivo/';
    return this.http
      .get(ruta + criterio)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doFilterBusquedaAvanzada(fecha?: any, unidad?: any, anio?: any, nro?: any){
    this.other_header = this.other_header;
    const ruta = this.api + '/' + 'filterBusqAvanzada/';
    return this.http
      .get(ruta + fecha +","+ unidad +","+ anio +","+ nro)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  //PLANILLAS "REPORTES";
  doFilterPlanilla(fecha1?: any, fecha2?: any, localidad?: any, departamento?: any, unidad?: any, delito?: any) {
    this.other_header = this.other_header;
    const ruta = this.api + '/' + 'filterPlanillaHD/';
    return this.http
      .get(ruta + fecha1 +","+ fecha2 +","+ localidad +","+ departamento +","+ unidad +","+ delito)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }


  doFilterPlanillaHD(fecha1?: any, fecha2?: any, departamento?: any, localidad?: any, zonaMetro?: any, dnpc?: boolean) {
    this.other_header = this.other_header;
    const ruta = this.api + '/' + 'filterPlanillaHechosDel/';
    return this.http
      .get(ruta + fecha1 +","+ fecha2 +","+ localidad +","+ departamento +","+ zonaMetro +","+ dnpc)
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }
}
