import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./service/auth.guard";
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";
import {LoginComponent, TodosComponent, AboutComponent, RegisterComponent} from "./account";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'todos/:uid/:name', component: TodosComponent, canActivate: [AngularFireAuthGuard, AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
