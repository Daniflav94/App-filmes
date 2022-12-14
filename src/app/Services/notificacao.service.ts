import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }

  showmessage(message:string){
    this.snackbar.open(message,'fechar',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:"top",

    })
  }
}