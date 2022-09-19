import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Barrio, Calle, Delito, Lugar, Preventivo } from 'src/app/models/index.models';
import { BarrioService, CalleService, DelitoService, LugarService, PreventivoService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-preventivo',
  templateUrl: './abm-preventivo.component.html',
  styleUrls: ['./abm-preventivo.component.scss'],
})
export class AbmPreventivoComponent implements OnInit {
  public id!: number;
  //valida el formulario
  form!: FormGroup;
  //imput filtros
  busqueda;
  busquedaLugar;
  busquedaCalle;
  busquedaBarrio;
  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: Preventivo;

  ditems: Delito[];
  ditem: Delito;

  lugarItems: Lugar[];
  litem: Lugar;

  CItems: Calle[];
  Citem: Calle;

  BItems: Barrio[];
  Bitem: Barrio;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PreventivoService,
    private wsdlLugar: LugarService,
    private wsdlDelito: DelitoService,
    private wsdlCalle: CalleService,
    private wsdlBarrio: BarrioService,
    private formBuilder: FormBuilder
  ) {
    this.item = new Preventivo();
    this.busqueda = '';
    this.busquedaLugar = '';
    this.busquedaCalle = '';
    this.busquedaBarrio = '';
    this.ditems = [];
    this.ditem = new Delito();
    this.lugarItems = [];
    this.litem = new Lugar();
    this.CItems = [];
    this.Citem = new Calle();
    this.BItems = [];
    this.Bitem = new Barrio();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required],
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
        this.guardar();
      }
    //}
  }

  async actualizarDatos(obj: Preventivo) {
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
    console.log("hora", this.item.hora);
    try {
      let data = await this.wsdl
        .doInsert(this.item)
        .then
        /*data => {
          console.log("data de data", data)
        }*/
        ();
      const result = JSON.parse(JSON.stringify(data));
      console.log('result', result);
      if (result.code == 200) {
        this.back();
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

  async filtrarDelito() {
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlDelito.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        console.log('data', result);
        if (result.code == 200) {
          this.ditems = [];
          this.ditems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la busqueda realizada')
        }
      }
    } catch (error) {}
  }

  capturar(event: Delito){
    if(event != undefined){
      this.item.delito = event.id;
      this.busqueda = event.descripcion;
    }
  }

  async filtrarLugar() {
    try {
      if (this.busquedaLugar != '' && this.busquedaLugar != undefined) {
        let data = await this.wsdlLugar.doFilter(this.busquedaLugar).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.lugarItems = [];
          this.lugarItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada')
        }
      }
    } catch (error) {
      Swal.fire("Error al obtener el dato")
    }
  }

  capturarLugar(event: Lugar){
    if(event != undefined){
      this.item.lugar = event.id;
      this.busquedaLugar = event.descripcion;
    }
  }

  async filtrarCalle() {
    try {
      if (this.busquedaCalle != '' && this.busquedaCalle != undefined) {
        let data = await this.wsdlCalle.doFilter(this.busquedaCalle).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.CItems = [];
          this.CItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada')
        }
      }
    } catch (error) {
      Swal.fire("Error al obtener el dato")
    }
  }

  capturarCalle(event: Calle){
    if(event != undefined){
      this.item.calle = event.id;
      this.busquedaCalle = event.nombre;
    }
  }

  async filtrarBarrio() {
    try {
      if (this.busquedaBarrio != '' && this.busquedaBarrio != undefined) {
        let data = await this.wsdlBarrio.doFilter(this.busquedaBarrio).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.BItems = [];
          this.BItems = result.data;
        } else if (result.code == 204) {
          Swal.fire('No existe la búsqueda realizada')
        }
      }
    } catch (error) {
      Swal.fire("Error al obtener el dato")
    }
  }

  capturarBarrio(event: Barrio){
    if(event != undefined){
      this.item.barrio = event.id;
      this.busquedaBarrio = event.nombre;
    }
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
