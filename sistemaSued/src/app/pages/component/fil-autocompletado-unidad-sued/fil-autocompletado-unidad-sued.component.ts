import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnidadesSued } from 'src/app/models/index.models';
import { UnidadesSuedService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-autocompletado-unidad-sued',
  templateUrl: './fil-autocompletado-unidad-sued.component.html',
  styleUrls: ['./fil-autocompletado-unidad-sued.component.scss']
})
export class FilAutocompletadoUnidadSuedComponent implements OnInit {

  @Output()
  unidadSeleccionada: EventEmitter<UnidadesSued> = new EventEmitter<UnidadesSued>();

  keyword = 'codigo';
  cargando: Boolean = false;
  item: UnidadesSued;
  items: UnidadesSued[];

  constructor(private wsdl: UnidadesSuedService) {
    this.item = new UnidadesSued();
    this.items = [];
  }

  ngOnInit(): void {
    this.list();
  }

  async list() {
    try {
      this.cargando = true;
      const data = await this.wsdl.getList(1, 1000).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.items = result.data;
        this.cargando = false;
      } else {
        //this.cargando = false;
      }
    } catch (error) {
      //this.cargando = false;
    } finally {
      this.cargando = false;
    }
  }

  selectEvent(item: any) {
    this.item = item;
    this.unidadSeleccionada.emit(this.item);
  }

  onChangeSearch(val: any) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something when input is focused
  }
}
