import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Barrio } from 'src/app/models/index.models';
import { BarrioService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-barrio',
  templateUrl: './combo-barrio.component.html',
  styleUrls: ['./combo-barrio.component.scss']
})
export class ComboBarrioComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Barrio> = new EventEmitter<Barrio>();


  item: Barrio;
  items: Barrio[];


  constructor(private wsdl: BarrioService) {
    this.item = new Barrio();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Barrio) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Barrio, c2: Barrio): boolean {
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
