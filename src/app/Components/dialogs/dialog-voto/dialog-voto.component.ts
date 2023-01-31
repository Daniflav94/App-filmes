import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from 'src/app/Interfaces/account';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';

@Component({
  selector: 'app-dialog-voto',
  templateUrl: './dialog-voto.component.html',
  styleUrls: ['./dialog-voto.component.css']
})
export class DialogVotoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
  public filme: FilmeLista,
  private apiFilmesService: ApiFilmesService
  ) { }

  nota: any = "?"
  notaFinal: Account = {
    rated: {
        value: 0
    }
  }
  estrelaContorno: string = '/assets/estrela-cinza.png'
  estrelaCheia: string = '/assets/estrela-azul-cheia.png'

  estrela: string = this.estrelaContorno
  estrela2: string = this.estrelaContorno
  estrela3: string = this.estrelaContorno
  estrela4: string = this.estrelaContorno
  estrela5: string = this.estrelaContorno
  estrela6: string = this.estrelaContorno
  estrela7: string = this.estrelaContorno
  estrela8: string = this.estrelaContorno
  estrela9: string = this.estrelaContorno
  estrela10: string = this.estrelaContorno


  ngOnInit(): void {
  }

  mudarEstrela1(){
    this.estrela  = this.estrelaCheia
  }

  mudarEstrela2(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
  }

  mudarEstrela3(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
  }

  mudarEstrela4(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
  }

  mudarEstrela5(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
  }

  mudarEstrela6(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
    this.estrela6  = this.estrelaCheia
  }

  mudarEstrela7(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
    this.estrela6  = this.estrelaCheia
    this.estrela7  = this.estrelaCheia
  }

  mudarEstrela8(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
    this.estrela6  = this.estrelaCheia
    this.estrela7  = this.estrelaCheia
    this.estrela8  = this.estrelaCheia
  }

  mudarEstrela9(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
    this.estrela6  = this.estrelaCheia
    this.estrela7  = this.estrelaCheia
    this.estrela8  = this.estrelaCheia
    this.estrela9  = this.estrelaCheia
  }

  mudarEstrela10(){
    this.estrela  = this.estrelaCheia
    this.estrela2  = this.estrelaCheia
    this.estrela3  = this.estrelaCheia
    this.estrela4  = this.estrelaCheia
    this.estrela5  = this.estrelaCheia
    this.estrela6  = this.estrelaCheia
    this.estrela7  = this.estrelaCheia
    this.estrela8  = this.estrelaCheia
    this.estrela9  = this.estrelaCheia
    this.estrela10  = this.estrelaCheia
  }

  receberNota1(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 1
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaContorno
    this.estrela3 = this.estrelaContorno
    this.estrela4 = this.estrelaContorno
    this.estrela5 = this.estrelaContorno
    this.estrela6 = this.estrelaContorno
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota2(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 2
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaContorno
    this.estrela4 = this.estrelaContorno
    this.estrela5 = this.estrelaContorno
    this.estrela6 = this.estrelaContorno
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota3(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 3
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaContorno
    this.estrela5 = this.estrelaContorno
    this.estrela6 = this.estrelaContorno
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota4(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 4
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaContorno
    this.estrela6 = this.estrelaContorno
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota5(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 5
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaContorno
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota6(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 6
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaCheia
    this.estrela7 = this.estrelaContorno
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota7(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 7
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaCheia
    this.estrela7 = this.estrelaCheia
    this.estrela8 = this.estrelaContorno
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota8(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 8
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaCheia
    this.estrela7 = this.estrelaCheia
    this.estrela8 = this.estrelaCheia
    this.estrela9 = this.estrelaContorno
    this.estrela10 = this.estrelaContorno   
  }

  receberNota9(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 9
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaCheia
    this.estrela7 = this.estrelaCheia
    this.estrela8 = this.estrelaCheia
    this.estrela9 = this.estrelaCheia
    this.estrela10 = this.estrelaContorno   
  }

  receberNota10(){
    let botao = document.querySelector('#btn-avaliar')
    botao?.classList.add('btn-ativo')
    this.nota = 10
    this.estrela = this.estrelaCheia
    this.estrela2 = this.estrelaCheia
    this.estrela3 = this.estrelaCheia
    this.estrela4 = this.estrelaCheia
    this.estrela5 = this.estrelaCheia
    this.estrela6 = this.estrelaCheia
    this.estrela7 = this.estrelaCheia
    this.estrela8 = this.estrelaCheia
    this.estrela9 = this.estrelaCheia
    this.estrela10 = this.estrelaCheia   
  }

  avaliar(){
    this.apiFilmesService.avaliarFilme(this.filme.id, this.nota).subscribe()
    
    /* this.apiFilmesService.accountStates(this.filme.id).subscribe(() => {
      if(this.nota != undefined){
        this.notaFinal.rated.value = this.nota
      }
     
    }) */
    
  }

}
