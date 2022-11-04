import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UturuncoUtils } from '../../utils/uturuncoUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  other_header: any;
  api;

  constructor(private http: HttpClient) {
    this.api = environment.URL + 'persona/';
  }
  /* particularidad de la entidad */

  getList(page: string | number, limit: string | number) {
    this.other_header = null;
    return this.http
      .get(this.api + page + '/' + limit, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doUpdate(evento: any, id: any) {
    return this.http
      .put(this.api + id, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doDelete(id: any) {
    this.other_header = null;
    return this.http
      .delete(this.api + id, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doInsert(evento: any) {
    this.other_header = null;
    return this.http
      .post(this.api, evento, { headers: this.other_header })
      .toPromise()
      .catch((err) => {});
  }

  doCriteria(
    criteria: any,
    one: any,
    populate: any,
    sort: any,
    page: any,
    limit: any
  ) {
    this.other_header = null;

    const cr = {
      criteria: criteria,
      one: one,
      populate: populate,
      sort: sort,
    };

    return this.http
      .post(this.api + 'criteria/' + page + '/' + limit, cr, {
        headers: this.other_header,
      })
      .toPromise()
      .catch((err) => {});
  }

  doFind(id: any) {
    this.other_header = UturuncoUtils.getHeader();

    return this.http
      .get(this.api + '/' + id, { headers: this.other_header })
      .toPromise()
      .catch((err) => {
        return { code: 500, msg: err.message };
      });
  }
}
