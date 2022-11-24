import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeoLocalizacionInversaComponent } from "./component/geo-localizacion-inversa/geo-localizacion-inversa.component";
import { PantallaPrincipalComponent } from "./component/pantalla-principal/pantalla-principal.component";
import { AbmArmaMarcaComponent } from "./frm-abm/abm-arma-marca/abm-arma-marca.component";
import { AbmArtContravencionComponent } from "./frm-abm/abm-art-contravencion/abm-art-contravencion.component";
import { AbmArticuloComponent } from "./frm-abm/abm-articulo/abm-articulo.component";
import { AbmBarrioComponent } from "./frm-abm/abm-barrio/abm-barrio.component";
import { AbmCalleComponent } from "./frm-abm/abm-calle/abm-calle.component";
import { AbmConsultaUsuarioComponent } from "./frm-abm/abm-consulta-usuario/abm-consulta-usuario.component";
import { AbmContravencionComponent } from "./frm-abm/abm-contravencion/abm-contravencion.component";
import { AbmDelitoComponent } from "./frm-abm/abm-delito/abm-delito.component";
import { AbmDepartamentoComponent } from "./frm-abm/abm-departamento/abm-departamento.component";
import { AbmDncpComponent } from "./frm-abm/abm-dncp/abm-dncp.component";
import { AbmDtallePreventivoComponent } from "./frm-abm/abm-dtalle-preventivo/abm-dtalle-preventivo.component";
import { AbmEstudioComponent } from "./frm-abm/abm-estudio/abm-estudio.component";
import { AbmIdentidadGeneroComponent } from "./frm-abm/abm-identidad-genero/abm-identidad-genero.component";
import { AbmLocalidadComponent } from "./frm-abm/abm-localidad/abm-localidad.component";
import { AbmLugarComponent } from "./frm-abm/abm-lugar/abm-lugar.component";
import { AbmMarcaMotoComponent } from "./frm-abm/abm-marca-moto/abm-marca-moto.component";
import { AbmMedioComponent } from "./frm-abm/abm-medio/abm-medio.component";
import { AbmModalidadComponent } from "./frm-abm/abm-modalidad/abm-modalidad.component";
import { AbmModeloMotoComponent } from "./frm-abm/abm-modelo-moto/abm-modelo-moto.component";
import { AbmModeloVehiculoComponent } from "./frm-abm/abm-modelo-vehiculo/abm-modelo-vehiculo.component";
import { AbmNacionesComponent } from "./frm-abm/abm-naciones/abm-naciones.component";
import { AbmObjetoComponent } from "./frm-abm/abm-objeto/abm-objeto.component";
import { AbmOcupacionComponent } from "./frm-abm/abm-ocupacion/abm-ocupacion.component";
import { AbmPreVictimaComponent } from "./frm-abm/abm-pre-victima/abm-pre-victima.component";
import { AbmPrevAmpliacionComponent } from "./frm-abm/abm-prev-ampliacion/abm-prev-ampliacion.component";
import { AbmPrevCaratulaComponent } from "./frm-abm/abm-prev-caratula/abm-prev-caratula.component";
import { AbmPrevInculpadoComponent } from "./frm-abm/abm-prev-inculpado/abm-prev-inculpado.component";
import { AbmPrevModalidadComponent } from "./frm-abm/abm-prev-modalidad/abm-prev-modalidad.component";
import { AbmPrevObjetoComponent } from "./frm-abm/abm-prev-objeto/abm-prev-objeto.component";
import { AbmPreventivoMedioComponent } from "./frm-abm/abm-preventivo-medio/abm-preventivo-medio.component";
import { AbmPreventivoComponent } from "./frm-abm/abm-preventivo/abm-preventivo.component";
import { AbmProvinciaComponent } from "./frm-abm/abm-provincia/abm-provincia.component";
import { AbmRegistroCivilComponent } from "./frm-abm/abm-registro-civil/abm-registro-civil.component";
import { AbmSexoComponent } from "./frm-abm/abm-sexo/abm-sexo.component";
import { AbmSnicComponent } from "./frm-abm/abm-snic/abm-snic.component";
import { AbmTipoMonedaComponent } from "./frm-abm/abm-tipo-moneda/abm-tipo-moneda.component";
import { AbmUnidadesComponent } from "./frm-abm/abm-unidades/abm-unidades.component";
import { AbmVehiculoMarcaComponent } from "./frm-abm/abm-vehiculo-marca/abm-vehiculo-marca.component";
import { AbmVinculoComponent } from "./frm-abm/abm-vinculo/abm-vinculo.component";
import { AbmPlanillaHDComponent } from "./frm-abm/component/abm-planilla-hd/abm-planilla-hd.component";
import { LstArmaMarcaComponent } from "./lst/lst-arma-marca/lst-arma-marca.component";
import { LstArticuloComponent } from "./lst/lst-articulo/lst-articulo.component";
import { LstBarrioComponent } from "./lst/lst-barrio/lst-barrio.component";
import { LstCalleComponent } from "./lst/lst-calle/lst-calle.component";
import { LstContravencionComponent } from "./lst/lst-contravencion/lst-contravencion.component";
import { LstDelitoComponent } from "./lst/lst-delito/lst-delito.component";
import { LstDepartamentoComponent } from "./lst/lst-departamento/lst-departamento.component";
import { LstDncpComponent } from "./lst/lst-dncp/lst-dncp.component";
import { LstEstudioComponent } from "./lst/lst-estudio/lst-estudio.component";
import { LstIdentidadGeneroComponent } from "./lst/lst-identidad-genero/lst-identidad-genero.component";
import { LstLocalidadComponent } from "./lst/lst-localidad/lst-localidad.component";
import { LstLugarComponent } from "./lst/lst-lugar/lst-lugar.component";
import { LstMarcaMotoComponent } from "./lst/lst-marca-moto/lst-marca-moto.component";
import { LstMedioComponent } from "./lst/lst-medio/lst-medio.component";
import { LstModalidadComponent } from "./lst/lst-modalidad/lst-modalidad.component";
import { LstModeloMotoComponent } from "./lst/lst-modelo-moto/lst-modelo-moto.component";
import { LstModeloVehiculoComponent } from "./lst/lst-modelo-vehiculo/lst-modelo-vehiculo.component";
import { LstNacionesComponent } from "./lst/lst-naciones/lst-naciones.component";
import { LstObjetoComponent } from "./lst/lst-objeto/lst-objeto.component";
import { LstOcupacionComponent } from "./lst/lst-ocupacion/lst-ocupacion.component";
import { LstPreventivoComponent } from "./lst/lst-preventivo/lst-preventivo.component";
import { LstProvinciaComponent } from "./lst/lst-provincia/lst-provincia.component";
import { LstSexoComponent } from "./lst/lst-sexo/lst-sexo.component";
import { LstTipoMonedaComponent } from "./lst/lst-tipo-moneda/lst-tipo-moneda.component";
import { LstUnidadesComponent } from "./lst/lst-unidades/lst-unidades.component";
import { LstUsuariosComponent } from "./lst/lst-usuarios/lst-usuarios.component";
import { LstVehiculoMarcaComponent } from "./lst/lst-vehiculo-marca/lst-vehiculo-marca.component";
import { LstVinculoComponent } from "./lst/lst-vinculo/lst-vinculo.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
    {
      path: '',
      component: PagesComponent,
      children: [
        { path: 'principal', component: PantallaPrincipalComponent},
          {
          path: 'lst-departamento',
          children: [
            {
              path: 'abm/:id',
              component: AbmDepartamentoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstDepartamentoComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-barrio',
          children: [
            {
              path: 'abm/:id',
              component: AbmBarrioComponent,
             // canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstBarrioComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-calle',
          children: [
            {
              path: 'abm/:id',
              component: AbmCalleComponent,
             // canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstCalleComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-delito',
          children: [
            {
              path: 'abm/:id',
              component: AbmDelitoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstDelitoComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-dncp',
          children: [
            {
              path: 'abm/:id',
              component: AbmDncpComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstDncpComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-articulo',
          children: [
            {
              path: 'abm/:id',
              component: AbmArticuloComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstArticuloComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-lugar',
          children: [
            {
              path: 'abm/:id',
              component: AbmLugarComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstLugarComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-medio',
          children: [
            {
              path: 'abm/:id',
              component: AbmMedioComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstMedioComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-localidad',
          children: [
            {
              path: 'abm/:id',
              component: AbmLocalidadComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstLocalidadComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-naciones',
          children: [
            {
              path: 'abm/:id',
              component: AbmNacionesComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstNacionesComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-provincia',
          children: [
            {
              path: 'abm/:id',
              component: AbmProvinciaComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstProvinciaComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-objeto',
          children: [
            {
              path: 'abm/:id',
              component: AbmObjetoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstObjetoComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-modalidad',
          children: [
            {
              path: 'abm/:id',
              component: AbmModalidadComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstModalidadComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-estudio',
          children: [
            {
              path: 'abm/:id',
              component: AbmEstudioComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstEstudioComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-ocupacion',
          children: [
            {
              path: 'abm/:id',
              component: AbmOcupacionComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstOcupacionComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-sexo',
          children: [
            {
              path: 'abm/:id',
              component: AbmSexoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstSexoComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-vinculo',
          children: [
            {
              path: 'abm/:id',
              component: AbmVinculoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstVinculoComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-marcas',
          children: [
            {
              path: 'abm/:id',
              component: AbmArmaMarcaComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstArmaMarcaComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-marcasVehiculos',
          children: [
            {
              path: 'abm/:id',
              component: AbmVehiculoMarcaComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstVehiculoMarcaComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-modelos',
          children: [
            {
              path: 'abm/:id',
              component: AbmModeloVehiculoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstModeloVehiculoComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-preventivo',
          children: [
            {
              path: 'abm/:id',
              component: AbmPreventivoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstPreventivoComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'medioUtilizado/:id',
              component: AbmPreventivoMedioComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'objeto/:id',
              component: AbmPrevObjetoComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'modalidad/:id',
              component: AbmPrevModalidadComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'caratula/:id',
              component: AbmPrevCaratulaComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'snic/:id',
              component: AbmSnicComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'victimas/:id',
              component: AbmPreVictimaComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'inculpados/:id',
              component: AbmPrevInculpadoComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'ampliacion/:id',
              component: AbmPrevAmpliacionComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'detalle/:id',
              component: AbmDtallePreventivoComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-contravencion',
          children: [
            {
              path: 'abm/:id',
              component: AbmContravencionComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstContravencionComponent,
             //canActivate: [AuthGuard],
            },
            {
              path: 'articulado/:id',
              component: AbmArtContravencionComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-marcasMoto',
          children: [
            {
              path: 'abm/:id',
              component: AbmMarcaMotoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstMarcaMotoComponent,
             //canActivate: [AuthGuard],
            }
          ],
        },
        {
          path: 'lst-modelosMoto',
          children: [
            {
              path: 'abm/:id',
              component: AbmModeloMotoComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstModeloMotoComponent,
             //canActivate: [AuthGuard],
            }
          ],
        },
        {
          path: 'lst-identidadGenero',
          children: [
            {
              path: 'abm/:id',
              component: AbmIdentidadGeneroComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstIdentidadGeneroComponent,
             //canActivate: [AuthGuard],
            }
          ],
        },
        {
          path: 'lst-tipoMoneda',
          children: [
            {
              path: 'abm/:id',
              component: AbmTipoMonedaComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstTipoMonedaComponent,
             //canActivate: [AuthGuard],
            }
          ],
        },
        {
          path: 'geolocalizacion',
          children: [
            {
              path: 'geo',
              component: GeoLocalizacionInversaComponent,
              //canActivate: [AuthGuard],
            },
            
          ],
        },
        {
          path: 'lst-unidades',
          children: [
            {
              path: 'abm/:id',
              component: AbmUnidadesComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstUnidadesComponent,
             //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'lst-usuarios',
          children: [
            {
              path: 'abm/:id',
              component: AbmRegistroCivilComponent,
              //canActivate: [AuthGuard],
            },
            {
              path: '',
              component: LstUsuariosComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'busqueda-usuario',
          children: [
            {
              path: 'abm',
              component: AbmConsultaUsuarioComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
        {
          path: 'planillaHD',
          children: [
            {
              path: 'abm',
              component: AbmPlanillaHDComponent,
              //canActivate: [AuthGuard],
            },
          ],
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule {}