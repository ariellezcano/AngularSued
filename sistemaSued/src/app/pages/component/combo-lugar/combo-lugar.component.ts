import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calle } from 'src/app/models/index.models';
import { CalleService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-lugar',
  templateUrl: './combo-lugar.component.html',
  styleUrls: ['./combo-lugar.component.scss']
})
export class ComboLugarComponent implements OnInit {
  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Calle> = new EventEmitter<Calle>();


  item: Calle;
  items: Calle[];


  constructor(private wsdl: CalleService) {
    this.item = new Calle();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Calle) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Calle, c2: Calle): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  async listar() {
    await this.wsdl.getList(1, 100).then((data: any) => {
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
