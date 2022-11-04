import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wg-paginate',
  templateUrl: './wg-paginate.component.html',
  styleUrls: ['./wg-paginate.component.scss'],
})
export class WgPaginateComponent implements OnInit {
  @Output()
  pagina: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  total!: number;
  @Input()
  primero: number = 1;
  @Input()
  final!: number;
  @Input()
  siguiente!: number;
  @Input()
  anterior!: number;
  @Input()
  actual!: number;

  constructor() {
    this.actual;
  }

  ngOnInit(): void {}

  pase(page: number) {
    this.pagina.emit(page);
  }
}
