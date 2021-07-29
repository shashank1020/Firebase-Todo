import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {AngularFireAuth} from "@angular/fire/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  loading = false
  submitted = false
  isError = false
  name!: string
  serverMessage: { code: string, message: string } = {code: '', message: ''}


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private afu: AngularFireAuth
  ) {
    if (localStorage.getItem('user')) {
      this.routeToTodo()
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls
  }
  routeToTodo() {
    this.router.navigate(['/about'])
  }


  onSubmit() {
    this.isError = false
    this.submitted = true
    this.loading = true
    const fo = this.form.value

    if (this.form.invalid) {
      return
    }

    this.authService.LoginInWith(String(fo.email), String(fo.password)).then(() => {
      this.loading = false
      this.name = this.authService.currentUserName
      this.routeToTodo()
    }).catch(error => {
      console.error("error at login component " + error)
      setTimeout(() => this.loading = false, 1000)
      this.isError = true
      this.serverMessage = error
    })
  }
}
