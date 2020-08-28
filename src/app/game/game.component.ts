import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerAtual;
  proximoPlayer;
  indexAtual = 0;
  otherPlayers = [];
  topo;
  sentidoHorario = true;
  mais2 = false;
  mais4 = false;
  continuar = false;
  cor = "VERMELHO";
  event;

  constructor(
    private router : Router,
    public cards: CardService,
    public service: CommonService) { }

  ngOnInit(): void {
    if(this.service.players.length == 0){
      this.router.navigate(["/inicial"]);
      return;
    }
    this.cards.criaBaralho();
    this.service.players.forEach(player => {
      player.cartas = this.cards.getJogo();
    });
    this.playerAtual = this.service.players[this.indexAtual];
    this.proximoPlayer = this.service.players[this.getNextIndex()];
    this.indexAtual = this.getNextIndex();
    this.otherPlayers = this.service.getPlayersExcept(this.playerAtual);
    this.topo = this.cards.monte[this.cards.monte.length-1];
    console.log(this.service.players);
  }

  jogaCarta(event) {
    this.event = event;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var cartaAJogar : string = idAttr.nodeValue;
    var naoJoga = false;
    if(!this.cards.verificaRegra(cartaAJogar, this.topo)){
      return;
    }
    if(!this.continuar){
      if(cartaAJogar.includes("TROCASENTIDO")){
        //troca o sentido de jogo
        this.sentidoHorario = !this.sentidoHorario;
        
      }else
      if(cartaAJogar.includes("NAOJOGA")){
        naoJoga = true;
      }else
      if(cartaAJogar.includes("MAIS2")){
        console.log("mais2");
        this.mais2 = true;
      }else
      if(cartaAJogar.includes("MAIS4")){
        console.log("mais4");
        this.mais4 = true;
        this.ligaEscolheCor();
        //cartaAJogar = `${this.cor}MAIS4`
        this.continuar = true;
        return;
      }else
      if(cartaAJogar.includes("MUDACOR")){
        this.ligaEscolheCor();
        this.continuar = true;
        return;
      }
    }
    this.continuar = false;
    this.tiraEscolhaCor();
    if(cartaAJogar.includes("MAIS4")){
      cartaAJogar = `${this.cor}MAIS4`;
    }else if(cartaAJogar.includes("MUDACOR")){
      cartaAJogar = `${this.cor}MUDACOR`;
    }
    this.service.playCard(cartaAJogar, this.playerAtual);
    this.cards.playCard(cartaAJogar);
    this.topo = this.cards.getTopCard();
    if(naoJoga){
      //salta um ronda, para o jogador seguinte
      this.proximaRonda();
    }
    var aux = this.service.verificaVencedor();
    if(aux == null){
      this.mostraBranco();
      return;
    }
    if(confirm(`O jogador ${aux.name} venceu! Deseja iniciar um novo jogo?`)){
      this.indexAtual = 0;
      this.cards.restart();
      this.ngOnInit();
      return;
    }else{
      this.playerAtual = null;
      this.indexAtual = 0;
      this.otherPlayers = [];
      this.topo = null;
      this.service.clear();
      this.cards.restart();
      this.router.navigate(["/inicial"]);
    }
  }
  continue(){
    this.proximaRonda();
    if(this.mais2){
      this.tiraCartas(2);
      this.mais2 = false;
      //this.proximaRonda();
     //return;
    }else if(this.mais4){
      this.tiraCartas(4);
      this.mais4 = false;
      //this.proximaRonda();
      //return;
    }
    this.tiraBranco();
  }

  getCardImage(card){
    return card.number === "MAIS4" || card.number === "MUDACOR" ? `assets/images/${card.number}.png` : `assets/images/${card.color}${card.number}.png`
  }
  getNextIndex(){
    if(this.sentidoHorario){
      return (this.indexAtual + 1)%this.service.players.length;
    }else{
      if(this.indexAtual - 1 < 0){
        return this.service.players.length-1;
      }else{
        return this.indexAtual - 1;
      }
    }
  }

  tiraCartaEAcaba(){
    var aux = this.cards.tiraCarta();
    this.service.addCard(this.playerAtual, aux);
    this.mostraBranco();
  }

  tiraCartas(number){
    for(var i = 0; i < number; i++){
      var aux = this.cards.tiraCarta();
      this.service.addCard(this.playerAtual, aux);
    }
  }

  proximaRonda(){
    this.playerAtual = this.service.players[this.indexAtual];
    this.otherPlayers = this.service.getPlayersExcept(this.playerAtual);
    this.proximoPlayer = this.service.players[this.getNextIndex()];
    this.indexAtual = this.getNextIndex();
  }

  mostraBranco(){
    var aux = document.getElementById("white");
    var aux2 = document.getElementById("master");
    aux.style.visibility = 'visible';
    aux2.style.visibility = 'hidden';
  }

  tiraBranco(){
    var aux = document.getElementById("white");
    var aux2 = document.getElementById("master");
    aux.style.visibility = 'hidden';
    aux2.style.visibility = 'visible';
  }

  //escolheu = false;
  ligaEscolheCor(){
    var aux = document.getElementById("escolheCor");
    var aux2 = document.getElementById("master");
    aux.style.visibility = 'visible';
    aux2.style.visibility = 'hidden';
    /*while(!this.escolheu){
      this.escolheu = false;
    }*/
  }
  escolheCor(){
    //this.escolheu = true;
    this.jogaCarta(this.event);
  }
  tiraEscolhaCor(){
    var aux = document.getElementById("escolheCor");
    var aux2 = document.getElementById("master");
    aux.style.visibility = 'hidden';
    aux2.style.visibility = 'visible';
  }

  getCardId(card){
    return `${card.color}${card.number}`
  }
}
