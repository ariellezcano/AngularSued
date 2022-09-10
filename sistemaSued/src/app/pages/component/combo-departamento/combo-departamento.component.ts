import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departamento } from 'src/app/models/index.models';
import { DepartamentoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-departamento',
  templateUrl: './combo-departamento.component.html',
  styleUrls: ['./combo-departamento.component.scss']
})
export class ComboDepartamentoComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Departamento> = new EventEmitter<Departamento>();


  item: Departamento;
  items: Departamento[];


  constructor(private wsdl: DepartamentoService) {
    this.item = new Departamento();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Departamento) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Departamento, c2: Departamento): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listar() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data;
      this.items.sort((x: any, y: any) => {
        if (x.descripcion > y.descripcion) {
          return 1;
        }
        if (x.descripcion < y.descripcion) {
          return -1;
        }
        return 0;
      });
    });
  }

}
