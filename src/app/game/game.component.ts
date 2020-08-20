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

  constructor(
    private router : Router,
    private cards: CardService,
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

  getCardId(card){
    return `${card.color}${card.number}`
  }

  jogaCarta(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    if(!this.cards.verificaRegra(value, this.topo)){
      return;
    }
    this.service.playCard(value, this.playerAtual);
    this.cards.playCard(value);
    this.topo = this.cards.monte[this.cards.monte.length-1];
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
    this.tiraBranco();
  }

  getCardImage(card){
    return `assets/images/${card.color}${card.number}.png`
  }
  getNextIndex(){
    return (this.indexAtual + 1)%this.service.players.length;
  }

  tiraCarta(){
    var aux = this.cards.tiraCarta();
    this.service.addCard(this.playerAtual, aux);
    this.proximaRonda();
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
}
