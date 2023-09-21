import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ocupacion } from 'src/app/models/index.models';
import { OcupacionService } from 'src/app/services/index.service';

@Component({
  selector: 'app-filtro-ocupacion',
  templateUrl: './filtro-ocupacion.component.html',
  styleUrls: ['./filtro-ocupacion.component.scss']
})
export class FiltroOcupacionComponent implements OnInit {

  @Output()
  filter: EventEmitter<Ocupacion> = new EventEmitter<Ocupacion>();

  proccess: Boolean;
  public search: String = '';
  public oldSearch: String = '';

  item: Ocupacion;
  items: Ocupacion[];
  filtro: string = '';
  /* Searcheable table Filter */
  public limit: Number;
  public paginaActual: number;
  public totalRegistros!: Number;
  public totalPaginas!: any;
  paginaAnterior!: number;
  anterior: boolean;
  siguiente: boolean;
  paginaSiguiente!: number;
  public limits: Number[] = [5, 10, 25, 50, 100];

  // setPage(page: any) {
  //   this.paginaActual = page;
  //   this.list();
  // }

  constructor(private wsdl: OcupacionService) {
    this.proccess = false;
    this.limit = 5;
    this.paginaActual = 1;
    this.item = new Ocupacion();
    this.items = [];
    this.siguiente = false;
    this.anterior = false;
  }

  ngOnInit() {
    this.list();
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
    this.list();
  }


  public async list() {
    try {
      if (this.filtro == '' || this.filtro == undefined) {
        let data = await this.wsdl
          .getList(this.paginaActual, this.limit)
          .then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
          this.totalRegistros = result.totalRegistros;
          this.totalPaginas = result.totalPaginas;
          //this.emmit.emit(this.items);
        }
      } else if (this.filtro != undefined && this.filtro != '') {
        let data = await this.wsdl.doFilter(this.filtro).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.items = result.data;
          //this.emmit.emit(this.items);
        } else if (result.code == 204) {
          this.items = result.data;
          //this.emmit.emit(this.items);
        }
      }
    } catch (error) {}
  }

  enviar(item: Ocupacion) {
    this.filter.emit(item);
  }

  compareFn(c1: Ocupacion, c2: Ocupacion): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  Filter(event: any) {
    this.filtro = event.target.value;
    this.list();
  }

}
