import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento, Localidad, Naciones, Provincia } from 'src/app/models/index.models';
import { LocalidadService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-localidad',
  templateUrl: './abm-localidad.component.html',
  styleUrls: ['./abm-localidad.component.scss']
})
export class AbmLocalidadComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: Localidad;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: LocalidadService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Localidad();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required]
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
       // //console.log('find', result);
        if (result.code == 200) {
          this.item = result.dato;
          if(this.item.nacion != undefined){
            this.item.codNac = this.item.nacionNavigation.codigo;
          }
          if(this.item.provincia != undefined){
            this.item.codProv = this.item.provinciaNavigation.codigo;
          }
          if(this.item.departamento != undefined){
            this.item.codDto = this.item.dptoNavigation.codigo;
          }
        }
      } catch (error) {}
    }
  }

  doAction() {
    this.enviado = true;
    //if (this.form.valid) {
      if (this.id > 0) {
        this.actualizarDatos(this.item);
      } else {
        ////console.log("datos enviados", this.item)
        this.guardar();
      }
    //}
  }

  async actualizarDatos(obj: Localidad) {
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

  seleccionDpto(event: Departamento) {
    if (event != undefined) {
      this.item.departamento = event.id;
      this.item.codDto = event.codigo;
    }
  }
  seleccionNac(event: Naciones) {
    if (event != undefined) {
      this.item.nacion = event.id;
      this.item.codNac = event.codigo;
    }
  }
  seleccionProv(event: Provincia) {
    if (event != undefined) {
      this.item.provincia = event.id 
      this.item.codProv = event.codigo;
    }
  }

  
  back() {
    this.router.navigate(['/lst-localidad']);
  }

}
