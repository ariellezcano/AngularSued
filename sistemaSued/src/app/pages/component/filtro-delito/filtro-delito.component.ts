import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Delito } from 'src/app/models/index.models';
import { DelitoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-filtro-delito',
  templateUrl: './filtro-delito.component.html',
  styleUrls: ['./filtro-delito.component.scss']
})
export class FiltroDelitoComponent implements OnInit {

  @Output()
  filter: EventEmitter<Delito> = new EventEmitter<Delito>();

  proccess: Boolean;
  public search: String = '';
  public oldSearch: String = '';

  item: Delito;
  items: Delito[];
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
  public limits: Number[] = [7, 10, 25, 50, 100];

  constructor(private wsdl: DelitoService) {
    this.proccess = false;
    this.limit = 5;
    this.paginaActual = 1;
    this.item = new Delito();
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
          //console.log("llegue", result.data)
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

  enviar(item: Delito) {
    this.filter.emit(item);
  }

  compareFn(c1: Delito, c2: Delito): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  Filter(event: any) {
    this.filtro = event.target.value;
    ////console.log('this.filter', this.filtro);
    this.list();
  }

}
