import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/dashboard/pages/to-do-list/to-do-list.component';
import { environment } from 'src/environments/environment';

export interface Lists {
  ok: boolean;
  lists: string;
}

export interface List {
  ok: boolean;
  list: {
    id: string;
    name: string;
    tasks: Task[];
  };
}

export interface NewList {
  uid: string;
  name: string;
}

export interface NewTask {
  listId: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  createToDoList(data: NewList) {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };
    return this.http.post<NewList>(
      environment.api + '/users/list/create',
      data,
      httpOptions
    );
  }

  getToDoList() {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };
    return this.http.get<Lists>(
      environment.api + '/lists/' + localStorage.getItem('uid'),
      httpOptions
    );
  }

  getToDoListById(id: string) {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };
    return this.http.get<List>(
      environment.api + '/lists/get/' + id,
      httpOptions
    );
  }

  deleteToDoList(id: string) {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };

    return this.http.delete<List>(
      environment.api + '/lists/delete/' + id,
      httpOptions
    );
  }

  createTask(data: NewTask) {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };
    return this.http.post<NewTask>(
      environment.api + '/lists/task/create',
      data,
      httpOptions
    );
  }

  updateTask(taskId: string) {
    const token = localStorage.getItem('x-token') || '';

    const httpOptions = {
      headers: new HttpHeaders({
        'x-token': token,
      }),
    };

    return this.http.put(
      environment.api + '/lists/task/update/' + taskId,
      {},
      httpOptions
    );
  }
}
