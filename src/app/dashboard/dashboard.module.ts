import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../core/shared/header/header.component';
import { SidebarComponent } from '../core/shared/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NothingSelectedComponent } from './pages/nothing-selected/nothing-selected.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    NothingSelectedComponent,
    ToDoListComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, ReactiveFormsModule],
})
export class DashboardModule {}
