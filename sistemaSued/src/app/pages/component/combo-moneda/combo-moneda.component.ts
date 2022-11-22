import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoMoneda } from 'src/app/models/index.models';
import { TipoMonedaService } from 'src/app/services/index.service';

@Component({
  selector: 'app-combo-moneda',
  templateUrl: './combo-moneda.component.html',
  styleUrls: ['./combo-moneda.component.scss']
})
export class ComboMonedaComponent implements OnInit {

  @Input()
  set dibujar(item: any) {
    this.item = item;
  }

  @Output() emitir: EventEmitter<TipoMoneda> = new EventEmitter<TipoMoneda>();


  item: TipoMoneda;
  items: TipoMoneda[];


  constructor(private wsdl: TipoMonedaService) {
    this.item = new TipoMoneda();
    this.items = [];
    this.listar();
  }

  ngOnInit(): void {
    this.listar();
  }

  //captura el dato del combo
  capturar(event: TipoMoneda) {
    this.item = event;
    this.emitir.emit(this.item);
  }

  compareWitch(c1: TipoMoneda, c2: TipoMoneda): boolean {
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
