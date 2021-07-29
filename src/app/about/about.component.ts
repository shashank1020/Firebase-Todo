import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";


@Component({
  selector: 'app-info',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout()
  }
  isLoggedIn() {
    if( localStorage.getItem('user')){
      return true
    }
    return false
  }
  get uid() {
    return this.authService.currentUserId
  }
  get name() {
    return this.authService.currentUserName
  }

}
