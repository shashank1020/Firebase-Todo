import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }
  isLoggedIn() {
    if( localStorage.getItem('user')){
      return true
    }
    return false
  }

  logout() {
    this.authService.logout()
  }
}
