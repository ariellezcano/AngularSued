import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdentidadGenero } from 'src/app/models/index.models';
import { IdentidadGeneroService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-identidad-genero',
  templateUrl: './combo-identidad-genero.component.html',
  styleUrls: ['./combo-identidad-genero.component.scss']
})
export class ComboIdentidadGeneroComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<IdentidadGenero> = new EventEmitter<IdentidadGenero>();


  item: IdentidadGenero;
  items: IdentidadGenero[];


  constructor(private wsdl: IdentidadGeneroService) {
    this.item = new IdentidadGenero();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: IdentidadGenero) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: IdentidadGenero, c2: IdentidadGenero): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nombre > y.nombre) {
          return 1;
        }
        if (x.nombre < y.nombre) {
          return -1;
        }
        return 0;
      });
    });
  }
}
