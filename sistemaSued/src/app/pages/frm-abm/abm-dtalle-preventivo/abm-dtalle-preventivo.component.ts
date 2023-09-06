import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Preventivo } from 'src/app/models/index.models';
import { PreventivoService } from 'src/app/services/index.service';

@Component({
  selector: 'app-abm-dtalle-preventivo',
  templateUrl: './abm-dtalle-preventivo.component.html',
  styleUrls: ['./abm-dtalle-preventivo.component.scss'],
})
export class AbmDtallePreventivoComponent implements OnInit {
  @Output()
  public id!: number;

  prev: Preventivo;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdlPreventivo: PreventivoService,
    private formBuilder: FormBuilder
  ) {
    this.prev = new Preventivo();
  }

  ngOnInit(): void {
    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    console.log("this.id", this.id)
    this.findId();
  }

  async findId() {
    if (this.id > 0) {
      try {
        let data = await this.wsdlPreventivo.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.prev = result.dato;
          //console.log("preventivo", this.prev)
        }
      } catch (error) {}
    }
  }

  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Si';
    } else {
      valor = 'No';
    }
    return valor;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
