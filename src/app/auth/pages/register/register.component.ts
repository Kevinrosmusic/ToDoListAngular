import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { CustomValidators } from 'src/app/core/validations/validations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: CustomValidators.match(
          'password',
          'confirmPassword',
          'password-mismatch'
        ),
      }
    );
  }

  sendRegister(): void {
    if (this.form.invalid) {
      return;
    }

    this.authService.register(this.form).subscribe(
      (response) => {
        Swal.fire('Usuario Registrado').then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/auth/login']);
          }
        });
      },
      (error) => {
        Swal.fire({
          title: 'El correo ya existe',
          icon: 'error',
        });
        console.log(error);
      }
    );
  }
}
