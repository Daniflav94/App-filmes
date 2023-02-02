import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/user';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { 
    this.formLogin = fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
   
  }

  public entrar(): void{
    if(this.formLogin.valid){
      const credenciais: User = this.formLogin.value
      localStorage.getItem('token')
      this.authService.autenticarPorEmaileSenha(credenciais).subscribe(resposta => {
        const usuario = resposta.user
        console.log(usuario)
        localStorage.setItem("uidUser", usuario.uid)
      })
    }
    else{
      this.notification.showmessage("Verifique os dados digitados e tente novamente!")
    }
  }

  public entrarComGoogle(): void{
    this.authService.autenticarPeloGoogle().subscribe(resposta => {
      this.router.navigate(["/filmes"])
      const usuario = resposta.user
      localStorage.setItem("uidUser", usuario.uid)
    })
  }

}
