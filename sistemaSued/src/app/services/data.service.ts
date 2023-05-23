import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //private dataArray = new Subject<any[]>();
  dataArray: any[];

  constructor() {
    this.dataArray = [];
   }

  setDataArray(data: any[]) {
    this.dataArray = data;
  }

  getDataArray() {
    return this.dataArray;
  }
}
