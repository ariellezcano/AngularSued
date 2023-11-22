import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Unidad,
  UnidadesSued,
} from 'src/app/models/index.models';
import { UnidadesSuedService } from 'src/app/services/index.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-unidades',
  templateUrl: './abm-unidades.component.html',
  styleUrls: ['./abm-unidades.component.scss'],
})
export class AbmUnidadesComponent implements OnInit {
  public id!: number;
  //valida el formulario
  form!: FormGroup;

  //variable para verificar si fue enviado los datos
  enviado = false;

  item!: UnidadesSued;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wsdl: UnidadesSuedService,
    private formBuilder: FormBuilder
  ) {
    this.item = new UnidadesSued();
  }

  ngOnInit(): void {
    //controla los campos del formulario
    this.form = this.formBuilder.group({
      codigo: ['', Validators.required],
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
        ////console.log("datos enviados", this.item)
        this.guardar();
      }
    }
  }

  async actualizarDatos(obj: UnidadesSued) {
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
      let data = await this.wsdl
        .doInsert(this.item)
        .then
        /*data => {
          //console.log("data de data", data)
        }*/
        ();
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

  unidad(event: Unidad) {
    if (event != undefined) {
      this.item.unidad = event.id;
      this.item.nombre = event.nombre;
      ////console.log("Unidad",event)
      // if(event.cuof != undefined){
      //   this.item.codigo = this.removeUnderscore(event.cuof);
      // }
    }
  }


  // removeUnderscore(input: string): string {
  //   // Utilizamos la función replace para reemplazar todos los guiones bajos (-) por una cadena vacía ('')
  //   const result = input.replace(/-/g, '');
  //   return result;
  // }

  // convertStringToInt(input: string): number | null {
  //   // Eliminar guiones bajos de la cadena
  //   const stringWithoutUnderscore = input.replace(/_/g, '');
  
  //   // Intentar convertir la cadena en un número entero
  //   const integerValue = parseInt(stringWithoutUnderscore, 10);
  
  //   // Verificar si la conversión fue exitosa
  //   if (!isNaN(integerValue)) {
  //     return integerValue;
  //   } else {
  //     return null; // Retornar null si no se pudo convertir
  //   }
  // }
  

  // seleccionLocalidad(event: Localidad) {
  //   if (event != undefined) {
  //     this.item.localidad = event.id;
  //   }
  // }

  // seleccionDpto(event: Departamento) {
  //   if (event != undefined) {
  //     this.item.departamento = event.id;
  //   }
  // }

  back() {
    this.router.navigate(['/lst-unidades']);
  }
}
