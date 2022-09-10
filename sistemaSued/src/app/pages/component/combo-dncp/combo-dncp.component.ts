import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DetDnpc } from 'src/app/models/index.models';
import { DncpService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-dncp',
  templateUrl: './combo-dncp.component.html',
  styleUrls: ['./combo-dncp.component.scss']
})
export class ComboDncpComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<DetDnpc> = new EventEmitter<DetDnpc>();


  item: DetDnpc;
  items: DetDnpc[];


  constructor(private wsdl: DncpService) {
    this.item = new DetDnpc();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: DetDnpc) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: DetDnpc, c2: DetDnpc): boolean {
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
