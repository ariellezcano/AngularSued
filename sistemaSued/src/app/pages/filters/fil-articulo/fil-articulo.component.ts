import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DelitoArt } from 'src/app/models/index.models';
import { ArticuloService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-articulo',
  templateUrl: './fil-articulo.component.html',
  styleUrls: ['./fil-articulo.component.scss']
})
export class FilArticuloComponent implements OnInit {

  @Output() emmit: EventEmitter<DelitoArt[]> = new EventEmitter();

  busqueda: any;
  items: DelitoArt[];

  paginaAnterior!: number;
  anterior: boolean;
  paginaActual: number;
  siguiente: boolean;
  paginaSiguiente!: number;
  totalRegistros!: number;
  totalPaginas!: number;
  public limit: any;
  public limits: Number[] = [5, 10, 25];

  constructor(private wsdl: ArticuloService) {
    this.busqueda = '';
    this.items = [];

    this.limit = 5;
    this.paginaActual = 1;
    this.siguiente = false;
    this.anterior = false;
  }

  ngOnInit(): void {
    this.filter();
  }

  setPage(page: any, estado: any) {
    this.paginaActual = page;
    if (estado == 'siguiente') {
      this.paginaSiguiente = this.paginaActual + 1;
      this.paginaActual = this.paginaSiguiente;
    }
    if (estado == 'anterior') {
      this.paginaAnterior = this.paginaActual - 1;
      this.paginaActual = this.paginaAnterior;
    }
    this.filter();
  }

  async filter() {
    try {
      if (this.busqueda == '' || this.busqueda == undefined) {
        let data = await this.wsdl
          .getList(this.paginaActual, this.limit)
          .then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
          this.totalRegistros = result.totalRegistros;
          this.totalPaginas = result.totalPaginas;
          ////console.log("result", result)
          this.emmit.emit(this.items);
        }
      } else if (this.busqueda != undefined && this.busqueda != '') {
        let data = await this.wsdl.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        ////console.log('result', result);
        if (result.code == 200) {
          // this.items = [];
          // result.res.data.forEach((element: any) => {
          //   if (element.activo) {
          //     this.items.push(element);
          //   }
          // });
          this.items = result.data;
          this.emmit.emit(this.items);
        } else if (result.code == 204) {
          this.items = result.data;
          this.emmit.emit(this.items);
        }
      }
    } catch (error) {}
  }

}
