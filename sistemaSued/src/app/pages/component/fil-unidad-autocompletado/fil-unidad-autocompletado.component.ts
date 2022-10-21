import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Unidad } from 'src/app/models/index.models';
import { UnidadService } from 'src/app/services/index.service';

@Component({
  selector: 'app-fil-unidad-autocompletado',
  templateUrl: './fil-unidad-autocompletado.component.html',
  styleUrls: ['./fil-unidad-autocompletado.component.scss'],
})
export class FilUnidadAutocompletadoComponent implements OnInit {
  @Output()
  unidadSeleccionada: EventEmitter<Unidad> = new EventEmitter<Unidad>();

  keyword = 'nombre';
  cargando: Boolean = false;
  item: Unidad;
  items: Unidad[];

  constructor(private wsdl: UnidadService) {
    this.item = new Unidad();
    this.items = [];
  }

  ngOnInit(): void {
    this.list();
  }

  async list() {
    try {
      this.cargando = true;
      const re = await this.wsdl.getList(1, 1000).then();
      const result = JSON.parse(JSON.stringify(re));
      if (result.code == 200) {
        this.items = result.data.docs;
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
