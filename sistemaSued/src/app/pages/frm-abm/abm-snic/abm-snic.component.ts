import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrevSnic } from 'src/app/models/index.models';
import { PreSnicService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-snic',
  templateUrl: './abm-snic.component.html',
  styleUrls: ['./abm-snic.component.scss']
})
export class AbmSnicComponent implements OnInit {

  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item: PrevSnic;
  guardando: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PreSnicService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevSnic();
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

  async actualizarDatos(obj: PrevSnic) {
    this.guardando = true;
    //console.log("enviado modificar", this.item)
    try {
      let data = await this.wsdl.doUpdate(this.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.guardando = false;
        //this.back();
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

  ckeckPresion=(num: number)=> {
    //Tipo de lugar
    if(num == 1){
      this.item.urbano = true;
      this.item.rural = false;
    }
    if(num == 2){
      this.item.urbano = false;
      this.item.rural = true;
    }
    if(num == 3){
      this.item.calle = true;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = false;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 4){
      this.item.calle = false;
      this.item.rutaNacional = true;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = false;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 5){
      this.item.calle = false;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = true;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = false;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 6){
      this.item.calle = false;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = true;
      this.item.autopistaProvincial = false;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 7){
      this.item.calle = false;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = true;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 8){
      this.item.calle = false;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = false;
      this.item.autovia = true;
      this.item.sinDeterminarLugar = false;
    }
    if(num == 9){
      this.item.calle = false;
      this.item.rutaNacional = false;
      this.item.rutaProvincial = false;
      this.item.autopistaNacional = false;
      this.item.autopistaProvincial = false;
      this.item.autovia = false;
      this.item.sinDeterminarLugar = true;
    }
    if(num == 10){
      this.item.vehiculoPeaton = true;
      this.item.vehiculoVehiculo = false;
      this.item.vehiculoObjeto = false;
      this.item.vehiculoBici = false;
      this.item.motoBici = false;
      this.item.bicicleta = false;
      this.item.vehiculo = false;
      this.item.vehiculoMoto = false;
      this.item.vehiculoTsangre = false;
      this.item.motoMoto = false;
      this.item.motoTsangre = false;
      this.item.motoPeaton = false;
      this.item.multiple = false;
      this.item.tren = false;
      this.item.atropelloAnimal = false;
      this.item.otroModo = false;
      this.item.vuelcoDespiste = false;
      this.item.modoEspecificar = null;
    }
    if(num == 11){
      this.item.vehiculoPeaton = false;
      this.item.vehiculoVehiculo = true;
      this.item.vehiculoObjeto = false;
      this.item.vehiculoBici = false;
      this.item.motoBici = false;
      this.item.bicicleta = false;
      this.item.vehiculo = false;
      this.item.vehiculoMoto = false;
      this.item.vehiculoTsangre = false;
      this.item.motoMoto = false;
      this.item.motoTsangre = false;
      this.item.motoPeaton = false;
      this.item.multiple = false;
      this.item.tren = false;
      this.item.atropelloAnimal = false;
      this.item.otroModo = false;
      this.item.vuelcoDespiste = false;
      this.item.modoEspecificar = null;
    }
    if(num == 12){
      this.item.vehiculoPeaton = false;
      this.item.vehiculoVehiculo = false;
      this.item.vehiculoObjeto = true;
      this.item.vehiculoBici = false;
      this.item.motoBici = false;
      this.item.bicicleta = false;
      this.item.vehiculo = false;
      this.item.vehiculoMoto = false;
      this.item.vehiculoTsangre = false;
      this.item.motoMoto = false;
      this.item.motoTsangre = false;
      this.item.motoPeaton = false;
      this.item.multiple = false;
      this.item.tren = false;
      this.item.atropelloAnimal = false;
      this.item.otroModo = false;
      this.item.vuelcoDespiste = false;
      this.item.modoEspecificar = null;
    }
  }


  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
