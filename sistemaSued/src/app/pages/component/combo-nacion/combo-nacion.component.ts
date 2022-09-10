import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Naciones } from 'src/app/models/index.models';
import { NacionesService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-nacion',
  templateUrl: './combo-nacion.component.html',
  styleUrls: ['./combo-nacion.component.scss']
})
export class ComboNacionComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Naciones> = new EventEmitter<Naciones>();


  item: Naciones;
  items: Naciones[];


  constructor(private wsdl: NacionesService) {
    this.item = new Naciones();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Naciones) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Naciones, c2: Naciones): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.nacion > y.nacion) {
          return 1;
        }
        if (x.nacion < y.nacion) {
          return -1;
        }
        return 0;
      });
    });
  }

}
