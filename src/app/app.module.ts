import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaFilmesComponent } from './Pages/lista-filmes/lista-filmes.component';
import { FilmeComponent } from './Pages/filme/filme.component';
import { ListaFavoritosComponent } from './Pages/lista-favoritos/lista-favoritos.component';
import { MaterialModule } from './material/material.module';
import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoginComponent } from './Pages/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { CadastroComponent } from './Pages/cadastro/cadastro.component';
import { ListaAssistirDepoisComponent } from './Pages/lista-assistir-depois/lista-assistir-depois.component';
import { CarrosselComponent } from './Components/carrossel/carrossel.component';
import { ResenhaPipe } from './Pipes/resenha.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ListaFilmesComponent,
    FilmeComponent,
    ListaFavoritosComponent,
    LoginComponent,
    HeaderComponent,
    CadastroComponent,
    ListaAssistirDepoisComponent,
    CarrosselComponent,
    ResenhaPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

