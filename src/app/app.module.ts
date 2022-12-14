import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaFavoritosComponent } from './Pages/lista-favoritos/lista-favoritos.component';
import { MaterialModule } from './material/material.module';
import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [
    AppComponent,
    ListaFilmesComponent,
    FilmeComponent,
    ListaFavoritosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

