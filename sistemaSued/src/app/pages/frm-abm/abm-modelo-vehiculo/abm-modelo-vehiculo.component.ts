import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloVehiculo, VehiculoMarca } from 'src/app/models/index.models';
import { ModeloVehiculoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-modelo-vehiculo',
  templateUrl: './abm-modelo-vehiculo.component.html',
  styleUrls: ['./abm-modelo-vehiculo.component.scss']
})
export class AbmModeloVehiculoComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: ModeloVehiculo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: ModeloVehiculoService,
    private formBuilder: FormBuilder
  ) {
    this.item = new ModeloVehiculo();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
      });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    this.findId();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findId() {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(this.id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
        }
      } catch (error) {}
    }
  }

  doAction() {
    this.enviado = true;
    if (this.form.valid) {
      if (this.id > 0) {
        this.actualizarDatos(this.item);
      } else {
        this.guardar();
      }
    }
  }

  async actualizarDatos(obj: ModeloVehiculo) {
    ////console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.back();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
      }
    } catch (error) {}
  }


  async guardar() {
    ////console.log("items", this.item);
    try {
      let data = await this.wsdl.doInsert(this.item).then(
        /*data => {
          //console.log("data de data", data)
        }*/
      );
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.back();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if(result.code == 204) {
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


  seleccionMarca(event: VehiculoMarca) {
    if (event != undefined) {
      this.item.marca = event.id;
    }
  }
  
  back() {
    this.router.navigate(['/lst-modelos']);
  }

}
