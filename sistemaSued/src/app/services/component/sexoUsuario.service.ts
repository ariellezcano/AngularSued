import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SexoService {
  other_header: any;
  api;

  constructor(private http: HttpClient) {
    this.api = environment.URLCivil + 'sexo';
    //this.api = "http://10.125.31.241:3000/unidad/";
  }
  /* particularidad de la entidad */

  getList(page: number, limit: number) {
    this.other_header = UturuncoUtils.getHeader();

    return this.http
    // + '?page=' + page + '&limit=' + limit  
    .get(this.api, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  getCriteria(criteria: string, page: number, limit: number) {
    this.other_header = UturuncoUtils.getHeader();
    return this.http
      .get(
        this.api + '/find/' + criteria + '?page=' + page + '&limit=' + limit,
        { headers: this.other_header }
      )
      .toPromise()
      .catch((err) => {
        return {
          code: 500,
          data: err.message,
          msg: 'Error en el servicio',
        };
      });
  }

  doFind(id: number) {
    this.other_header = UturuncoUtils.getHeader();

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

  doInsert(evento: object) {
    this.other_header = UturuncoUtils.getHeader();

    return this.http
      .post(this.api + '/', evento, { headers: this.other_header })
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

  doUpdate(evento: object, id: number) {
    this.other_header = UturuncoUtils.getHeader();

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

  doDelete(id: number) {
    this.other_header = UturuncoUtils.getHeader();

    return this.http
      .delete(this.api + '/' + id, { headers: this.other_header })
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
