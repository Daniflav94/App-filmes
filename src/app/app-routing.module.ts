import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';

const routes: Routes = [
  {
    path : '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    component: ListaFilmesComponent
  },
  {
    path: 'filmes/:idFilme',
    component: FilmeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
