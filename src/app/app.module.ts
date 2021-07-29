import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {environment} from "../environments/environment";
import {AppComponent} from './app.component';

import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFirestoreModule} from "@angular/fire/firestore";

import {AuthGuard} from "./service/auth.guard";

import {AboutComponent} from './about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,

    FormsModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
