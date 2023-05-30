import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
