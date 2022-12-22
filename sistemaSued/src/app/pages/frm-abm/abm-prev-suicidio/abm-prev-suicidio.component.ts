import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrevSnicSuicidio } from 'src/app/models/index.models';
import { SnicSuicidioService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-suicidio',
  templateUrl: './abm-prev-suicidio.component.html',
  styleUrls: ['./abm-prev-suicidio.component.scss']
})
export class AbmPrevSuicidioComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item: PrevSnicSuicidio;
  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: SnicSuicidioService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevSnicSuicidio();
    this.guardando = false;
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
        if (result.code == 200) {
          this.item = result.dato;
        }
      } catch (error) {}
    }
  }

  doAction() {
    //this.enviado = true;
    //if (this.form.valid) {
      if (this.id > 0 && this.item.preventivo > 0) {
        this.actualizarDatos(this.item);
      } else {
        this.guardar();
      }
    //}
  }

  async actualizarDatos(obj: PrevSnicSuicidio) {
    this.guardando = true;
    //console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(obj.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.findId();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.code == 204) {
        this.guardando = false;
      }
    } catch (error) {
      this.guardando = false;
    }
  }


  async guardar() {
    this.guardando = true;
    this.item.preventivo = this.id;
    try {
      let data = await this.wsdl.doInsert(this.item).then(
        /*data => {
          console.log("data de data", data)
        }*/
      );
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        this.findId();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Dato guardado correctamente!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if(result.code == 204) {
        this.guardando = false;
        Swal.fire({
          icon: 'info',
          title: 'Alerta...',
          text: 'El dato ya existe en la base de datos',
        });
      }
    } catch (error) {
      this.guardando = false;
      Swal.fire({
        icon: 'error',
        title: 'Alerta...',
        text: 'No se pudo insertar los datos',
      });
    }
  }

  
  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
