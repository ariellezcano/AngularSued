import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Objeto } from 'src/app/models/index.models';
import { ObjetoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';
import { FilObjetoComponent } from '../../filters/fil-objeto/fil-objeto.component';

@Component({
  selector: 'app-ventana-lst-abm-objeto',
  templateUrl: './ventana-lst-abm-objeto.component.html',
  styleUrls: ['./ventana-lst-abm-objeto.component.scss']
})
export class VentanaLstAbmObjetoComponent implements OnInit {

  @ViewChild(FilObjetoComponent, { static: false }) fil!: FilObjetoComponent;

  form!: FormGroup;

  item!: Objeto;

  items: Objeto[];

  //variable para verificar si fue enviado los datos
  enviado = false;

  constructor(
    private wsdl: ObjetoService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Objeto();
    this.items = [];
  }

  ngOnInit(): void {
    //this.rol = JSON.parse('' + Utils.getSession('personal')).rol;

    //controla los campos del formulario
    this.form = this.formBuilder.group({
      codigoTipo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }


  doAction() {
    this.enviado = true;
    if (this.form.valid) {
        //console.log("datos enviados", this.item)
        this.guardar();
      }
  }

  doFound(event: Objeto[]) {
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
        this.item = new Objeto();
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
