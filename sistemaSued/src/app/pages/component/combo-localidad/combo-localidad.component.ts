import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Localidad } from 'src/app/models/index.models';
import { LocalidadService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-localidad',
  templateUrl: './combo-localidad.component.html',
  styleUrls: ['./combo-localidad.component.scss']
})
export class ComboLocalidadComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<Localidad> = new EventEmitter<Localidad>();


  item: Localidad;
  items: Localidad[];


  constructor(private wsdl: LocalidadService) {
    this.item = new Localidad();
    this.items = [];
    //this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }
  //captura el dato del combo

  capturar(event: Localidad) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: Localidad, c2: Localidad): boolean {
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
