import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { Rol, UsuarioSued, Usuario_repo } from 'src/app/models/index.models';
import { RegistroUsuarioService, UsuariosSuedService } from 'src/app/services/index.service';
import { UturuncoUtils } from 'src/app/utils/uturuncoUtils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-consulta-usuario',
  templateUrl: './abm-consulta-usuario.component.html',
  styleUrls: ['./abm-consulta-usuario.component.scss'],
})
export class AbmConsultaUsuarioComponent implements OnInit {
  form!: FormGroup;

  item: Usuario_repo;
  dtSued!: UsuarioSued;
  proceso: Boolean;
  //tipoPersona: string;
  rol: boolean;

  public nombre: string = "SUED";
  public url: string = "https://policiadigital.chaco.gob.ar/sued/"
  public activo: boolean = true;


  constructor(private route: Router, private wsdl: UsuariosSuedService, private wsdlRegistro: RegistroUsuarioService) {
    this.item = new Usuario_repo();
    this.dtSued = new UsuarioSued();
    //this.tipoPersona = '';
    this.proceso = false;
    this.rol = false;
  }

  ngOnInit(): void {}

  public async insertSued() {
    this.dtSued.sistema = 1;
    //this.dtSued.userCreaRepo = 1;
    this.dtSued.userCreaRepo = UturuncoUtils.getSession('user');
   
    this.dtSued.fechaAlta = moment(this.dtSued.fechaAlta).format('YYYY-MM-DD');
    try {
      let data = await this.wsdl.doInsert(this.dtSued).then();
      console.log("data", data)
      let res = JSON.parse(JSON.stringify(data));
      console.log("res", res)
      if (res.code == 200) {
        // try {
        //   let data = await this.wsdlRegistro.patchSistemaHabilitados(this.dtSued.usuarioRepo, this.nombre, this.url, this.activo).then();
        // } catch (error) {
        // }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario habilitado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.back();
      } else {
      }
    } catch (error) {}
  }

  pregunta() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Usted está por habilitar un nuevo usuario!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.insertSued();
      }
    });
  }

  doFound(event: Usuario_repo) {
    console.log('Event', event);
    this.proceso = true;
    //console.log('event', event);
    if (event.civil != null) {
      //console.log('Personal civil', event);
        this.dtSued.tipoPersona = false;
        this.dtSued.civil = event.civil.id;
        this.dtSued.nombre = event.civil.nombre;
        this.dtSued.apellido = event.civil.apellido;
        this.dtSued.norDni = event.civil.norDni;
        this.dtSued.usuarioRepo = event.id;
        this.dtSued.rol = event.rol.id;
        this.dtSued.rolNombre = event.rol.nombre;
        //this.dtSued.usuarioRepo = event.id;
    }

    if (event.persona != null) {
        this.dtSued.tipoPersona = true;
        this.dtSued.persona = event.persona.id;
        this.dtSued.nombre = event.persona.nombre;
        this.dtSued.apellido = event.persona.apellido;
        this.dtSued.norDni = event.persona.norDni;
        this.dtSued.usuarioRepo = event.id;
        this.dtSued.rol = event.rol.id;
        this.dtSued.rolNombre = event.rol.nombre;
        //this.dtSued.userCreaRepo = event.id;
    }
  }

  seleccionRol(event: Rol) {
    if (event != undefined) {
      this.dtSued.rol = event.id;
    }
  }

  valor(item: any){
    let dato: string = '';
    if(item){
      dato = 'Personal Policial';
    }else{
      dato = 'Personal Administrativo';
    }
    return dato;
  }

  back() {
    this.route.navigate(['lst-usuarios']);
  }
}
