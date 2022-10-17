import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Contravencion } from 'src/app/models/index.models';
import { ContravencionService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-contravencion',
  templateUrl: './abm-contravencion.component.html',
  styleUrls: ['./abm-contravencion.component.scss']
})
export class AbmContravencionComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: Contravencion;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: ContravencionService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Contravencion();
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
       // console.log('find', result);
        if (result.code == 200) {
          this.item = result.dato;

          if (this.item.fechaContravencion != undefined) {
            this.item.fechaContravencion = moment(this.item.fechaContravencion).format(
              'YYYY-MM-DD'
            );
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
        //console.log("datos enviados", this.item)
        this.guardar();
      }
    //}
  }

  async actualizarDatos(obj: Contravencion) {
    //console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
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
    var hora = moment(this.item.hora, 'h:mm:ss A').format('HH:mm');
    this.item.hora = hora;
    this.item.personaCrea = 1;  
    try {
      let data = await this.wsdl.doInsert(this.item).then();
      console.log(data);
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      console.log("result", result);
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


  
  back() {
    this.router.navigate(['/lst-contravencion']);
  }

}
