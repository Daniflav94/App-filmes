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
    let usuario: any
    if(this.formLogin.valid){
      const credenciais: User = this.formLogin.value
      this.authService.autenticarPorEmaileSenha(credenciais).subscribe(resposta => {
        this.router.navigate(["/filmes"])  
        let usuario = resposta.user
        console.log(usuario)
        localStorage.setItem("uidUser", usuario.uid)
       
        this.authService.listarUsuarios().subscribe(resposta => {
          this.authService.getCurrentUser().subscribe(resp => {
            resposta.map((user: User) => {
              if(resp?.email == user.email){
                localStorage.setItem("user", usuario)
                usuario.displayName = user.displayName
                usuario.photoURL = user.photoURL
                usuario.uid = user.uid
              }
            })        
          })     
        })     
      })
    }
    else{
      this.notification.showmessage("Verifique os dados digitados e tente novamente!")
    }
  }

  public entrarComGoogle(): void{
    let usuario: any
    this.authService.autenticarPeloGoogle().subscribe(resposta => {
      this.router.navigate(["/filmes"])
      const usuario = resposta.user
      localStorage.setItem("uidUser", usuario.uid)
        this.authService.listarUsuarios().subscribe(resposta => {
          this.authService.getCurrentUser().subscribe(resp => {
            resposta.map((user: User) => {
              if(resp?.email == user.email){
                localStorage.setItem("user-photo", user.photoURL as string)
                localStorage.setItem("user-name", user.displayName as string)
                usuario.displayName = user.displayName
                usuario.photoURL = user.photoURL
                usuario.uid = user.uid
              }
            })        
          })     
        })     
    })
  }

}
