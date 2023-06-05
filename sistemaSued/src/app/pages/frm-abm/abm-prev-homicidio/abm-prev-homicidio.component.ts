import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrevSnicHomicidio } from 'src/app/models/index.models';
import { SnicHomicidioService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-homicidio',
  templateUrl: './abm-prev-homicidio.component.html',
  styleUrls: ['./abm-prev-homicidio.component.scss']
})
export class AbmPrevHomicidioComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item: PrevSnicHomicidio;
  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: SnicHomicidioService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevSnicHomicidio();
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
      } catch (error: any) {
        Swal.fire("Error", error)
      }
    }
  }

  ckeckPresion=(num: number)=>{
    if(num == 1){
      this.item.viaPublica = true;
      this.item.domParticular = false;
      this.item.comercio = false;
      this.item.intRodados = false;
      this.item.carcelComisaria = false;
      this.item.otroLugar = false;
    }
    if(num == 2){
      this.item.domParticular = true
      this.item.viaPublica = false;
      this.item.comercio = false;
      this.item.intRodados = false;
      this.item.carcelComisaria = false;
      this.item.otroLugar = false;
    }
    if(num == 3){
      this.item.comercio = true;
      this.item.viaPublica = false;
      this.item.domParticular = false;
      this.item.intRodados = false;
      this.item.carcelComisaria = false;
      this.item.otroLugar = false;
    }
    if(num == 4){
      this.item.intRodados = true;
      this.item.viaPublica = false;
      this.item.domParticular = false;
      this.item.comercio = false;
      this.item.carcelComisaria = false;
      this.item.otroLugar = false;
    }
    if(num == 5){
      this.item.carcelComisaria = true;
      this.item.viaPublica = false;
      this.item.domParticular = false;
      this.item.comercio = false;
      this.item.intRodados = false;
      this.item.otroLugar = false;
    }
    if(num == 6){
      this.item.otroLugar = true;
      this.item.viaPublica = false;
      this.item.domParticular = false;
      this.item.comercio = false;
      this.item.intRodados = false;
      this.item.carcelComisaria = false;
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

  async actualizarDatos(obj: PrevSnicHomicidio) {
    this.guardando = true;
    console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
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
      let data = await this.wsdl.doInsert(this.item).then();
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
