import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./service/auth.guard";
import {AngularFireAuthGuard} from "@angular/fire/auth-guard";
import {AboutComponent} from "./about/about.component";

const TodosModule = () => import('./account/todos/todos.module').then(x => x.TodosModule)
const RegierModule = () => import('./register/register.module').then(x => x.RegisterModule)
const LoginModule = () => import('./login/login.module').then(x => x.LoginModule)

const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'login', loadChildren: LoginModule},
  {path: 'register', loadChildren: RegierModule},
  {path: 'todos/:uid/:name', loadChildren: TodosModule , canActivate: [AngularFireAuthGuard, AuthGuard]},
  {path: '**', redirectTo: 'about', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
