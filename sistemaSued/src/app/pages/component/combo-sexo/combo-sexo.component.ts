import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sexo } from 'src/app/models/index.models';
import { SexoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-sexo',
  templateUrl: './combo-sexo.component.html',
  styleUrls: ['./combo-sexo.component.scss']
})
export class ComboSexoComponent implements OnInit {

  @Input()
  set dibujar(item: Sexo) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Sexo> = new EventEmitter<Sexo>();


  item: Sexo;
  items: Sexo[];


  constructor(private wsdl: SexoService) {
    this.item = new Sexo();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Sexo) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Sexo, c2: Sexo): boolean {
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
