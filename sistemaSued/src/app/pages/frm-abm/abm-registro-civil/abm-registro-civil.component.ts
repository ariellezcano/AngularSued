import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Civil, Sexo } from 'src/app/models/index.models';
import { UsuarioCivilService } from 'src/app/services/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';

@Component({
  selector: 'app-abm-registro-civil',
  templateUrl: './abm-registro-civil.component.html',
  styleUrls: ['./abm-registro-civil.component.scss']
})
export class AbmRegistroCivilComponent implements OnInit {
  @Output()
  finalizado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Output()
  cancelado: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;
  procesando!: Boolean;


  item!: Civil;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: UsuarioCivilService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Civil();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      norDni: ['', Validators.required],
      //sexo: ['', Validators.required],
      grupoS: ['', Validators.required],
      factor: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaFinContrato: ['', Validators.required],
      domicilio: ['', Validators.required],
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];

    //FindId
    this.findID();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async findID() {
    try {
      if (this.id > 0) {
        
        let data = await this.wsdl.doFind(this.id).then();
        let res = JSON.parse(JSON.stringify(data));
        //console.log("this id ",res.code);
        if (res.code == 200) {
          this.item = res.data;
          ////console.log("findid", this.item)
          if(this.item.fechaNacimiento != undefined) { 
            this.item.fechaNacimiento = moment(this.item.fechaNacimiento).format(
            'YYYY-MM-DD'
          );
          }
          if(this.item.fechaFinContrato != undefined) {
            this.item.fechaFinContrato = moment(this.item.fechaFinContrato).format(
            'YYYY-MM-DD'
          );
          }
          
        }
      } else {
        this.item = new Civil();
      }
    } catch (error) {
      UturuncoUtils.showToas('Error inesperado', 'error');
    }
  }

  doAction() {
    this.enviado = true;
    if (this.form.valid) {
      if (this.id > 0) {
        this.doEdit();
      } else {
        this.doCreate();
      }
    }
  }

  async doCreate() {
    try {
      //this.item.unidad.id = 622;
      this.item.usuarioCrea = UturuncoUtils.getSession('user');
     // //console.log("datos enviados", this.item)
      this.procesando = true;
      const res = await this.wsdl.doInsert(this.item).then();
      const result = JSON.parse(JSON.stringify(res));

      if (result.code == 200) {
        // this.item = result.status;
        UturuncoUtils.showToas('Se creo correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else if (result.status == 666) {
        // logout app o refresh token
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    } finally {
      this.procesando = false;
    }
  }

  async doEdit() {    
    try {
      this.procesando = true;
      const res = await this.wsdl.doUpdate(this.item.id, this.item).then();
      const result = JSON.parse(JSON.stringify(res));
      if (result.code == 200) {
        UturuncoUtils.showToas('Se actualizó correctamente', 'success');
        this.back();
        this.finalizado.emit(true);
      } else {
        UturuncoUtils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      UturuncoUtils.showToas('Excepción: ' + error.message, 'error');
    }
    this.procesando = false;
  }

  // seleccion(event: Sexo) {
  //   this.item.sexo = event;
  // }

  back() {
    this.router.navigate(['/lst-usuarios']);
  }

}
