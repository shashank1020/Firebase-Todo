import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Task } from './task'
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() task!: Task
  @Output() edit = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

}
