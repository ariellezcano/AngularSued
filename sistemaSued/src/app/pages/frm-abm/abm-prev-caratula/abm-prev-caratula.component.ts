import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Delito, PrevCaratula, Preventivo } from 'src/app/models/index.models';
import { DelitoService, PrevCaratulaService, PreventivoService } from 'src/app/services/index.service';
import { Utils } from 'src/app/utils/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-prev-caratula',
  templateUrl: './abm-prev-caratula.component.html',
  styleUrls: ['./abm-prev-caratula.component.scss']
})
export class AbmPrevCaratulaComponent implements OnInit {

  @Input()
  public id: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  busqueda;
  idSeleccion!: number;

  prev: Preventivo;
  prevCad: PrevCaratula;

  item: PrevCaratula;
  items: PrevCaratula[];

  Ditems: Delito[];
  Ditem: Delito;

  mostrarBtnModif: boolean;
  guardando: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: PrevCaratulaService,
    private wsdlModalidad: DelitoService,
    private formBuilder: FormBuilder
  ) {
    this.item = new PrevCaratula();
    this.items = [];
    this.prev = new Preventivo();
    this.prevCad = new PrevCaratula();
    this.busqueda = '';
    this.guardando = false;
    this.Ditem = new Delito();
    this.Ditems = [];
    this.mostrarBtnModif = false;
    this.id = 0;
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      //codigo: ['', Validators.required],
      //descripcion: ['', Validators.required]
    });

    //captura el id que viene en el url
    this.id = this.route.snapshot.params['id'];
    this.obtenerDetalle();
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // async findId() {
  //   if (this.id > 0) {
  //     try {
  //       let data = await this.wsdlPreventivo.getFindId(this.id).then();
  //       const result = JSON.parse(JSON.stringify(data));
  //       if (result.code == 200) {
  //         this.prev = result.dato;
  //         this.obtenerDetalle()
  //       }
  //     } catch (error) {}
  //   }
  // }

  async obtenerDetalle() {
    try {
      let data = await this.wsdl.doFilter(this.id).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        this.items = result.data;
      } else {
        this.items = [];
      }
    } catch (error) {}
  }

  //trae los datos para modificar
  async traerDatos(id: number) {
    if (this.id > 0) {
      try {
        let data = await this.wsdl.getFindId(id).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.item = result.dato;
          
          this.idSeleccion = this.item.id;
          this.busqueda = result.dato.delitoNavigation?.descripcion;
          this.mostrarBtnModif = true;
          console.log("id", this.idSeleccion, this.mostrarBtnModif)
        }
      } catch (error) {}
    }
  }
  // doAction() {
  //   this.enviado = true;
  //   if (this.form.valid) {
  //     if (this.id > 0) {
  //       this.actualizarDatos(this.item);
  //     } else {
  //       this.guardar();
  //     }
  //   }
  // }

  async actualizarDatos(obj: PrevCaratula) {
    //inhabilita el boton
    this.guardando = true;
    try {
      let data = await this.wsdl.doUpdate(this.item.id, obj).then();
      const result = JSON.parse(JSON.stringify(data));
      if (result.code == 200) {
        //abilita el boton
        this.guardando = false;
        this.idSeleccion=0;
        this.mostrarBtnModif =false;
        this.busqueda = '';
        this.item = new PrevCaratula();
        this.obtenerDetalle();
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
    } catch (error) {}
  }

  async agregarDato() {
    for (let index = 0; index < this.items.length; index++) {
      this.prevCad = new PrevCaratula();
      this.prevCad = this.items[index];
      if (this.prevCad.id == undefined) {
        this.item = new PrevCaratula();
        this.item = this.prevCad;
        this.guardar();
      }
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
        this.busqueda='';
        this.item = new PrevCaratula();
        this.obtenerDetalle();
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

  async filtrarDelito() {
    this.Ditems = [];
    try {
      if (this.busqueda != '' && this.busqueda != undefined) {
        let data = await this.wsdlModalidad.doFilter(this.busqueda).then();
        const result = JSON.parse(JSON.stringify(data));
        if (result.code == 200) {
          this.Ditems = result.data;
        } else if (result.code == 204) {
          Swal.fire({
            icon: 'warning',
            text: 'Verifique el dato ingresado!',
            footer: '<b>No existe la búsqueda realizada...</b>'
          })
        }
      }
    } catch (error) {}
  }

  capturar(event: Delito) {
    if (event != undefined) {
      this.busqueda = event.descripcion;
      this.item.delito = event.id;
      this.item.capturaDescripcion = event.descripcion;
      this.item.codigo = event.codTitulo +" - "+ event.codCapitulo +" - "+ event.codTipo +" - "+ event.codSubTipo;
    }
  }

  //agrega fila en memoria
  addRow() {
    this.busqueda = '';
    this.items.unshift(this.item);
    this.item = new PrevCaratula();
  }

  //elimina la fila en memoria
  deleteRow(indice: any) {
    this.items.splice(indice, 1);
  }

  // se utiliza para pintar la fila en memoria
  colores(item: PrevCaratula) {
    let color = '';
    if (item.id == undefined) {
      color = 't-success';
    } else {
      color = 't-default';
    }
    return color;
  }

  //cancelar modificacion
  cancelarModificacion() {
    this.busqueda = '';
    this.item = new PrevCaratula();
    this.mostrarBtnModif = false;
  }

  preDelete(item: PrevCaratula) {
    this.item = new PrevCaratula();
    this.item = item;

    Swal.fire({
      title: 'Esta Seguro?',
      text:
        '¡No podrás recuperar este archivo ' +
        item.delitoNavigation.descripcion +
        '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.value) {
        this.delete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Utils.showToas('Tu archivo esta seguro :)', 'warning');
      }
    });
  }

  async delete() {
    try {
      let res = await this.wsdl.doDelete(this.item.id).then();
      const result = JSON.parse(JSON.stringify(res));

      if (result.code == 200) {
        this.item = new PrevCaratula();
        this.obtenerDetalle();
        Utils.showToas('Eliminado exitosamente!', 'success');
      } else {
        Utils.showToas(result.msg, 'error');
      }
    } catch (error: any) {
      Utils.showToas('Excepción: ' + error.message, 'error');
    } finally {
    }
  }

  valor(item: any) {
    item = item;
    let valor = '';
    if (item) {
      valor = 'Si';
    }else{
      valor = 'No';
    }
    return valor;
  }

  back() {
    this.router.navigate(['/lst-preventivo']);
  }
}
