import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Provincia } from 'src/app/models/index.models';
import { ProvinciaService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-provincia',
  templateUrl: './combo-provincia.component.html',
  styleUrls: ['./combo-provincia.component.scss']
})
export class ComboProvinciaComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Provincia> = new EventEmitter<Provincia>();


  item: Provincia;
  items: Provincia[];


  constructor(private wsdl: ProvinciaService) {
    this.item = new Provincia();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Provincia) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Provincia, c2: Provincia): boolean {
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
