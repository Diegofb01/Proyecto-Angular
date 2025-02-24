import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _loginService: LoginService,
    private _cookieService: CookieService
  ) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const email: string = this.form.value.email;
    const password: string = this.form.value.password;
    

    console.log("Intentando iniciar sesión con:", email);

    this._loginService.loginUser(email, password).subscribe({
      next: (result: { role: string, email: string, token: string } | {}) => {
        console.log("Resultado de login:", result);

        if ('role' in result && 'token' in result) {
          this._cookieService.set('token', result.token);
          this._cookieService.set('userEmail', result.email);
          this._cookieService.set('userRole', result.role);
          

          console.log("Token guardado en cookie:", this._cookieService.get('token'));

          if (result.role === 'administrador') {
            console.log("➡ Redirigiendo a /admin-places");
            this._router.navigate(['/admin-places']);
          } else {
            console.log("➡ Redirigiendo a /inicio");
            this._router.navigate(['/inicio']);
          }
        } else {
          console.warn("Los datos introducidos son incorrectos o no existen");
          this.mostrarError('Los datos introducidos son incorrectos o no existen');
        }
      },
      error: (err) => {
        console.error("Error en el inicio de sesión:", err);
        this.mostrarError('Error en el inicio de sesión. Intente nuevamente.');
      },
    });
  }

  mostrarError(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.form.reset();
  }
}
