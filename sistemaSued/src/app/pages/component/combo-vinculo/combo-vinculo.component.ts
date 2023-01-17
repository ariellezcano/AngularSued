import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vinculo } from 'src/app/models/index.models';
import { VinculoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-vinculo',
  templateUrl: './combo-vinculo.component.html',
  styleUrls: ['./combo-vinculo.component.scss']
})
export class ComboVinculoComponent implements OnInit {

  @Input()
  set dibujar(item: Vinculo) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Vinculo> = new EventEmitter<Vinculo>();


  item: Vinculo;
  items: Vinculo[];


  constructor(private wsdl: VinculoService) {
    this.item = new Vinculo();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Vinculo) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Vinculo, c2: Vinculo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 50).then((data: any) => {
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
