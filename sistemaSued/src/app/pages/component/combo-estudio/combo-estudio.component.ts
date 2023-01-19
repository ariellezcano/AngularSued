import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estudio } from 'src/app/models/index.models';
import { EstudiosService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-estudio',
  templateUrl: './combo-estudio.component.html',
  styleUrls: ['./combo-estudio.component.scss']
})
export class ComboEstudioComponent implements OnInit {

  @Input()
  set dibujar(item: Estudio) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Estudio> = new EventEmitter<Estudio>();


  item: Estudio;
  items: Estudio[];


  constructor(private wsdl: EstudiosService) {
    this.item = new Estudio();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: Estudio) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Estudio, c2: Estudio): boolean {
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
