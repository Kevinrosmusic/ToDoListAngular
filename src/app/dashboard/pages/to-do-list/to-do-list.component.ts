import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/service/dashboard.service';
import Swal from 'sweetalert2';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export interface ToDoList {
  id: string;
  name: string;
  tasks: Task[];
}
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit, OnChanges {
  form!: FormGroup;
  @Input() listID: string = '';
  listInfo: ToDoList = {
    id: '',
    name: '',
    tasks: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnChanges(): void {
    this.getToDoList();
  }

  ngOnInit(): void {
    this.getToDoList();
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }

  getToDoList() {
    this.dashboardService.getToDoListById(this.listID).subscribe((response) => {
      this.listInfo = response.list;
    });
  }

  createTask() {
    if (this.form.valid) {
      const data = {
        listId: this.listID,
        title: this.form.get('title')?.value,
      };

      console.log(data);
      this.dashboardService.createTask(data).subscribe((response) => {
        Swal.fire('Tarea Agregada').then((result: any) => {
          if (result.isConfirmed) {
            window.location.href = '/dashboard/home';
          }
        });
      });
    }
  }

  deleteToDoList(id: string) {
    console.log(id);
    Swal.fire({
      title: 'Estas Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.dashboardService.deleteToDoList(id).subscribe((response) => {
          Swal.fire({
            title: 'Borrado!',
            text: 'El registro ha sido eliminado',
            icon: 'success',
          }).then((result: any) => {
            if (result.isConfirmed) {
              window.location.href = '/dashboard/home';
            }
          });
        });
      }
    });
  }

  updateTask(taskId: string) {
    this.dashboardService.updateTask(taskId).subscribe((response) => {
      console.log(response);
    });
  }

  backToHome() {}
}
