import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  usuario: string;
  rol: string;

  isExpanded = false;


  constructor(private route: Router) {
    this.usuario = "";
    this.rol = "";
  }

  ngOnInit() {
   /* this.rol = JSON.parse(''+Utils.getSession('personal')).rol;

    this.usuario =
      JSON.parse(''+Utils.getSession('personal')).apellido +
      " " +
      JSON.parse(''+Utils.getSession("personal")).nombre;*/
    }
  
  cerrar() {
    Utils.clearSession();
    this.route.navigate([""]);
  }

//para abajo no sirve
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
