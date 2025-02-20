import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  imports: [],
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {
    this.mensaje = data.mensaje;
  }

  cerrarDialogo(resultado: boolean): void {
    this.dialogRef.close(resultado);
  }
}
