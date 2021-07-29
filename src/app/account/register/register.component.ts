import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get f() {
    return this.form.controls
  }
  onSubmit() {
    this.submitted = true
    console.log(this.form)
    if (this.form.invalid) {
      return
    }
    const fo = this.form.value
    this.authService.registerWith(fo.name,fo.email, fo.password).then(() => {
      alert("you are registered")
      this.router.navigateByUrl('/about')
    }).catch(error => {
      console.error("error at register component "+error)
      this.router.navigateByUrl('/register')
    })
  }
}
