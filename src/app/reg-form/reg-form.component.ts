import { CommonModule } from '@angular/common';
import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import * as CryptoJS from 'crypto-js';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-reg-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './reg-form.component.html',
  styleUrl: './reg-form.component.css'
})
export class RegFormComponent {
  formRegister: FormGroup;
  comunidades_list: string[] = [
    'Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria',
    'Castilla y León', 'Castilla-La Mancha', 'Cataluña', 'Extremadura', 'Galicia',
    'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'La Rioja', 'Comunidad Valenciana', 'Otro'
  ];

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _loginService: LoginService,
    private _cookieService: CookieService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel | null 
  ) {
    this.formRegister = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      comunidad: [null],
      email: ['', [Validators.required, Validators.email]],
      role: ['usuario'], 
      birthday: [null], 
      gender: [''],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (!this.checkPasswordSame()) {
      this.showSnackBar("❌ Las contraseñas deben ser iguales.");
      return;
    }

    let formBirthday = this.formRegister.value.birthday;
    let formattedBirthday: Date | null = formBirthday ? new Date(formBirthday) : null;

    console.log("Fecha de nacimiento procesada:", formattedBirthday);

    this._loginService.comprobarCorreo(this.formRegister.value.email)
      .pipe(
        catchError(error => {
          console.error("Error al comprobar el correo:", error);
          this.showSnackBar("Error al verificar el correo. Inténtalo de nuevo.");
          return of([]); 
        })
      )
      .subscribe(emailExists => {
        if (emailExists.length > 0) {
          this.showSnackBar("⚠ El correo ya está registrado.");
          return;
        }

        const hashedPassword = CryptoJS.SHA256(this.formRegister.value.password).toString();  
        console.log("Contraseña encriptada:", hashedPassword);

        const userData: UserModel = {
          id: this.generateUserId(),
          firstName: this.formRegister.value.firstName,
          lastName: this.formRegister.value.lastName,
          comunidad: this.formRegister.value.comunidad,
          email: this.formRegister.value.email,
          role: "usuario",
          birthday: formattedBirthday,
          gender: this.formRegister.value.gender,
          phone: this.formRegister.value.phone,
          password: hashedPassword
        };

        this._loginService.addUser(userData)
          .pipe(
            catchError(error => {
              console.error("Error al registrar usuario:", error);
              this.showSnackBar("Error al registrar usuario. Inténtalo de nuevo.");
              return of(null);
            })
          )
          .subscribe(() => {
            console.log("Usuario registrado correctamente:", userData);
            this.showSnackBar("🎉 Registro exitoso. Redirigiendo al login...");
            this._router.navigate(["login"]);
          });
      });
  }

  checkPasswordSame(): boolean {
    return this.formRegister.value.password === this.formRegister.value.passwordRepeat;
  }

  private showSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  private generateUserId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
