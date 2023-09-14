import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Localidad } from 'src/app/models/index.models';
import { LocalidadService } from 'src/app/services/index.service';

@Component({
  selector: 'app-filtro-localidades',
  templateUrl: './filtro-localidades.component.html',
  styleUrls: ['./filtro-localidades.component.scss'],
})
export class FiltroLocalidadesComponent implements OnInit {
  @Output()
  filter: EventEmitter<Localidad> = new EventEmitter<Localidad>();

  proccess: Boolean;
  public search: String = '';
  public oldSearch: String = '';

  item: Localidad;
  items: Localidad[];
  filtro: string = '';
  /* Searcheable table Filter */
  public limit: Number;
  public paginaActual: number;
  public totalRegistros!: Number;
  public totalPaginas!: any;

  public lastPage!: Number;
  public count!: Number;
  public limits: Number[] = [5, 10, 25, 50, 100];

  setPage(page: any) {
    this.paginaActual = page;
    this.list();
  }

  constructor(private wsdl: LocalidadService) {
    this.proccess = false;
    this.limit = 5;
    this.paginaActual = 1;
    this.item = new Localidad();
    this.items = [];
  }

  ngOnInit() {
    // try {
    //   this.item = JSON.parse(Util.getItem('user')!)

    // } catch (error) {

    // }
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

  enviar(item: Localidad) {
    this.filter.emit(item);
  }

  compareFn(c1: Localidad, c2: Localidad): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  Filter(event: any) {
    this.filtro = event.target.value;
    console.log('this.filter', this.filtro);
    this.list();
  }
}
