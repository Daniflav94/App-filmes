import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogVotoComponent } from 'src/app/Components/dialogs/dialog-voto/dialog-voto.component';
import { Filme } from 'src/app/Interfaces/Filme';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { SalvosService } from 'src/app/Services/salvos.service';

@Component({
  selector: 'app-lista-assistir-depois',
  templateUrl: './lista-assistir-depois.component.html',
  styleUrls: ['./lista-assistir-depois.component.css']
})
export class ListaAssistirDepoisComponent implements OnInit {

  constructor(
    private notificacao: NotificationService,
    public dialog: MatDialog,
    public salvosService: SalvosService
  ) { }

  ngOnInit(): void {
    this.listarFilmes()
  }

  listaAssistirDepois: FilmeLista[] = []
  listaAssistidos: FilmeLista[] = []
  verAssistidos: boolean = false


  public listarFilmes(): void {
    this.salvosService.listarFilmesSalvos().subscribe(lista => {
      lista.forEach((filme: FilmeLista) => {
        if(filme.assistido == true){
          this.listaAssistidos.push(filme)
        }else{
          this.listaAssistirDepois.push(filme)
        }
      });
    })
  }

  public marcarComoAssistido(filme: FilmeLista): void {
    const index = this.listaAssistirDepois.indexOf(filme)
    this.listaAssistirDepois.splice(index, 1)
    filme.assistido = true
    this.salvosService.editarFilmeSalvo(filme).subscribe()
    this.listarFilmes()
  }

  public deletarFilme(id: string, filme: FilmeLista): void{
    this.salvosService.deletarFilmeSalvo(id).subscribe(
      (resposta) => {
        this.notificacao.showmessage("Filme excluído da sua lista de favoritos!")
        const index = this.listaAssistirDepois.indexOf(filme)
      this.listaAssistirDepois.splice(index, 1)
        this.listarFilmes()
      }
    )
  }

  public visualizarAssistidos(): void{
    this.verAssistidos = !this.verAssistidos
  }

  public openDialog(filme: FilmeLista) {
    this.dialog.open(DialogVotoComponent, {
      width: "500px",
      height: "280px",
      data: filme
    })
  }

}
