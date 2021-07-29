import {Component} from '@angular/core';
import {Task} from './tasks/task'
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent, TaskDialogResult} from "./task-dialog/task-dialog.component";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../service/auth.service";

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([])
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[]) => {
    subject.next(val as any)
  })
  return subject
}

// TODO: make user based todo

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent {
  constructor(private dialog: MatDialog, private store: AngularFirestore, private authService: AuthService) {
  }
  curUser = this.store.collection('users').doc(this.authService.currentUserId)

  todo = getObservable(this.store.collection(`users/${this.authService.currentUserId}/todo`))
  inProgress = getObservable(this.store.collection(`users/${this.authService.currentUserId}/inProgress`))
  done = getObservable(this.store.collection(`users/${this.authService.currentUserId}/done`))


  drop(event: CdkDragDrop<Task[]> | any): void {
    if (event.previousContainer === event.container) {
      return
    }
    const item = event.previousContainer.data[event.previousIndex]
    this.store.firestore.runTransaction(() => {
      return Promise.all([
        this.curUser.collection(event.previousContainer.id).doc(item.id).delete(),
        this.curUser.collection(event.container.id).add(item)
      ])
    })
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  edit(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      }
    })
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result.delete) {
        this.curUser.collection(list).doc(task.id).delete()
      } else {
        this.curUser.collection(list).doc(task.id).update(task)
      }
    })
  }

  newTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    })
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.store.collection(`users/${this.authService.currentUserId}/todo`).add(result.task))
  }

  logout() {
    this.authService.logout()
  }
}
