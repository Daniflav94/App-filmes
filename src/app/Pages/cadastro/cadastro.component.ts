import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notificacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { 
    this.formLogin = fb.group({
      displayName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  cadastrar():void{
    if(this.formLogin.valid){
      const user: User = this.formLogin.value
      user.photoURL = '/assets/img/1000_F_477056624_XAKvgSV5jgHHDEOyoyBAuOuPBJYySzHR (2).jpg'
      this.authService.criarUsuarioEmaileSenha(user).subscribe(resposta => {
        this.notification.showmessage("Cadastro realizado!")
        this.router.navigate(["/login"])
      })
    }
    
  }

}
