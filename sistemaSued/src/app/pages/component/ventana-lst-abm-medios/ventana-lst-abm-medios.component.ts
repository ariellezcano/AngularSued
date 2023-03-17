import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Medio } from 'src/app/models/index.models';
import { MedioService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';
import { FilMedioComponent } from '../../filters/fil-medio/fil-medio.component';

@Component({
  selector: 'app-ventana-lst-abm-medios',
  templateUrl: './ventana-lst-abm-medios.component.html',
  styleUrls: ['./ventana-lst-abm-medios.component.scss'],
})
export class VentanaLstAbmMediosComponent implements OnInit {
  @ViewChild(FilMedioComponent, { static: false }) fil!: FilMedioComponent;

  form!: FormGroup;

  item!: Medio;

  items: Medio[];
  user: any;
  rol: string;

  constructor(
    private wsdl: MedioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.item = new Medio();
    this.items = [];
    this.rol = '';
  }

  ngOnInit(): void {
    //this.rol = JSON.parse('' + Utils.getSession('personal')).rol;

    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required]
    });
  }

  doFound(event: Medio[]) {
    this.items = event;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async guardar() {
    //console.log("items", this.item);
    try {
      let data = await this.wsdl
        .doInsert(this.item)
        .then
        /*data => {
          console.log("data de data", data)
        }*/
        ();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.item = new Medio();
        this.fil.filter();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
        Swal.fire({
          icon: 'info',
          title: 'Alerta...',
          text: 'El dato ya existe en la base de datos',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
      });
    }
  }
}
