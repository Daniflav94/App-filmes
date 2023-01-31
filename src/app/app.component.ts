import { Component } from '@angular/core';
import { FilmeLista } from './Interfaces/FilmeLista';
import { Results } from './Interfaces/Results';
import { ApiFilmesService } from './Services/api-filmes.service';
import { FavoritosService } from './Services/favoritos.service';
import { NotificationService } from './Services/notificacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tmdb-filmes';

  constructor(
    
  ) { }

  
}
