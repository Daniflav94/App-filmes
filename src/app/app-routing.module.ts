import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestarNumeroGuard } from './Guards/testar-numero.guard';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaFavoritosComponent } from './Pages/lista-favoritos/lista-favoritos.component';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';
import { LoginComponent } from './Pages/login/login.component';



const rotas: Routes = [
  {
    path: '',
    redirectTo: 'filmes', //redireciona o usuário para outra no momento que ele entrar nessa rota
    pathMatch: 'full'
},
{
    path: 'filmes',
    component: ListaFilmesComponent
},
{
    path: 'filmes/:idFilme',
    component: FilmeComponent,
    canActivate: [TestarNumeroGuard]
},
{
  path: 'favoritos',
  component: ListaFavoritosComponent,
},
{
  path: 'login',
  component: LoginComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

