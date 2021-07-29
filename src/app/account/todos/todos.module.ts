import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosComponent} from "./todos.component";
import {TasksComponent} from "./tasks/tasks.component";
import {TaskDialogComponent} from "./task-dialog/task-dialog.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TodosComponent,
    TasksComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild([
      {path: '', component: TodosComponent}
    ]),
    FormsModule
  ]
})
export class TodosModule { }
