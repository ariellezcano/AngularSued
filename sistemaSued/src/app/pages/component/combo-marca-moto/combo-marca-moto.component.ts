import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarcaMoto } from 'src/app/models/index.models';
import { MarcaMotoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-marca-moto',
  templateUrl: './combo-marca-moto.component.html',
  styleUrls: ['./combo-marca-moto.component.scss']
})
export class ComboMarcaMotoComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<MarcaMoto> = new EventEmitter<MarcaMoto>();


  item: MarcaMoto;
  items: MarcaMoto[];


  constructor(private wsdl: MarcaMotoService) {
    this.item = new MarcaMoto();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: MarcaMoto) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: MarcaMoto, c2: MarcaMoto): boolean {
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
