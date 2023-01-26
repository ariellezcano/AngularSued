import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
import { Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fil-preventivo',
  templateUrl: './fil-preventivo.component.html',
  styleUrls: ['./fil-preventivo.component.scss'],
})
export class FilPreventivoComponent implements OnInit {
  @Output() emmit: EventEmitter<Preventivo[]> = new EventEmitter();

  busqueda: any;

  //filtro de busqueda avanzada
  fecha: any;
  uniCodigo: any;
  anio: any;
  nroPrev: any;

  items: Preventivo[];

  paginaAnterior!: number;
  anterior: boolean;
  paginaActual: number;
  siguiente: boolean;
  paginaSiguiente!: number;
  totalRegistros!: number;
  totalPaginas!: number;
  public limit: any;
  public limits: Number[] = [10, 25, 50];

  constructor(private wsdl: PreventivoService) {
    this.busqueda = '';
    this.items = [];

    this.limit = 10;
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
      if (
        (this.fecha == undefined &&
          this.uniCodigo == undefined &&
          this.anio == undefined &&
          this.nroPrev == undefined) ||
        (this.fecha == '' &&
          this.uniCodigo == '' &&
          this.anio == '' &&
          this.nroPrev == '')
      ) {
        let data = await this.wsdl
          .getList(this.paginaActual, this.limit)
          .then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
          this.totalRegistros = result.totalRegistros;
          this.totalPaginas = result.totalPaginas;
          //console.log("result", result)
          this.emmit.emit(this.items);
        }
      } else {

        if(this.fecha == undefined || this.fecha == ''){
          this.fecha = "fechaVacia";
        }
        if (this.uniCodigo == undefined || this.uniCodigo == '') {
          this.uniCodigo = 0;
        }
        if (this.anio == undefined || this.anio == '') {
          this.anio = 0;
        }
        if (this.nroPrev == undefined || this.nroPrev == '') {
          this.nroPrev = 0;
        }

        let data = await this.wsdl
          .doFilterBusquedaAvanzada(
            this.fecha,
            this.uniCodigo,
            this.anio,
            this.nroPrev
          )
          .then();
        const result = JSON.parse(JSON.stringify(data));
        console.log("result", result)
        if (result.code == 200) {
          this.items = result.data;
          //console.log(this.items)
          this.fecha = '';
          this.uniCodigo = '';
          this.anio = '';
          this.nroPrev = '';
          this.emmit.emit(this.items);
        } else if (result.code == 204) {
          this.fecha = '';
          this.uniCodigo = '';
          this.anio = '';
          this.nroPrev = '';
          //this.items = result.data;
          //this.emmit.emit(this.items);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No existe criterio buscado!',
          });
        }
       }//else{
      //   Swal.fire(
      //     '¡No agregó fecha a buscar!',
      //     'El dato es requerido para la respectiva búsqueda del Preventivo.',
      //     'warning'
      //   )
      // }
    } catch (error) {}
  }
}
