import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   component: PagesComponent,
  // },
  
  // {
  //   path: 'validacion/:id',
  //   component: VerificacionComponent,
  // },

  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/pages-routing.module').then((m) => m.PagesRoutingModule),
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
