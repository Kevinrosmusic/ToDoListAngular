import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/core/service/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  active: boolean = false;
  private modalService = inject(NgbModal);
  closeResult = '';
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
    });
  }
  isChangeActive($event: any) {
    this.active = $event.active;
    this.id = $event.id;
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    console.log(reason);
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSubmitToDoList(): void {
    if (this.form.invalid) {
      return;
    }

    this.dashboardService
      .createToDoList({
        uid: localStorage.getItem('uid') || '',
        name: this.form.value.title,
      })
      .subscribe((response) => {
        this.dashboardService.getToDoList().subscribe((response) => {
          window.location.reload();
        });
      });
  }
}
