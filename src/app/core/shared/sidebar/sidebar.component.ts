import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() activatedEvent = new EventEmitter<any>();
  @Output() ToDoLists: any = new EventEmitter<any>();
  activate = false;
  name = localStorage.getItem('name');

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.getToDoList();
  }

  getToDoList() {
    this.dashboardService.getToDoList().subscribe((response) => {
      this.ToDoLists = response.lists;
    });
  }

  activateList(id: string): void {
    this.activate = true;
    this.activatedEvent.emit({
      active: this.activate,
      id: id,
    });
  }
}
