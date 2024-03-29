import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DelitoArt } from 'src/app/models/index.models';
import { ArticuloService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-articulo',
  templateUrl: './combo-articulo.component.html',
  styleUrls: ['./combo-articulo.component.scss']
})
export class ComboArticuloComponent implements OnInit {
  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<DelitoArt> = new EventEmitter<DelitoArt>();


  item: DelitoArt;
  items: DelitoArt[];


  constructor(private wsdl: ArticuloService) {
    this.item = new DelitoArt();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: DelitoArt) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: DelitoArt, c2: DelitoArt): boolean {
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
