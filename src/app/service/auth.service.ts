import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null
  isLoggedIn: boolean = false
  constructor(private afu: AngularFireAuth, private route: Router) {
    this.afu.authState.subscribe((auth => {
      this.authState = auth
    }))
  }

  get isUserAnonymousloggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous: false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid: ''
  }

  get currentUserName(): string {
    return (this.authState !== null) ? this.authState.displayName: ''
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState: null
  }

  get isUserEmailLoggedIn(): boolean {
    return (this.authState !== null) && (!this.isUserAnonymousloggedIn);

  }

  async UpdateProfile(displayName: string) {
    const profile = {
      displayName: displayName,
    }
    return (await this.afu.currentUser)!.updateProfile(profile);
  }

  registerWith(name: string, email:string, password:string): Promise<void> {
    return this.afu.createUserWithEmailAndPassword(email,password).then((user => {
      this.authState = user
      this.UpdateProfile(name)
    })).catch(error => {
      console.error("error at registerWith "+error)
      throw error
    })
  }

  LoginInWith(email:string, password:string): Promise<void> {
    return this.afu.signInWithEmailAndPassword(email,password).then((user => {
      this.authState = user
      localStorage.setItem('user',JSON.stringify(user))
      this.isLoggedIn = true
    })).catch(error => {
      console.error("error at loginWith "+error)
      throw error
    })
  }

  logout(): Promise<void> {
    this.isLoggedIn = false
    localStorage.removeItem('user')
    this.route.navigate(['/about'])
    return this.afu.signOut()
  }
}
