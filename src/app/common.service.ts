import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  players : Player[] = [];
  constructor() { }

  setPlayers(number){
    for(var i = 0; i < number; i++){
      this.players.push({
        name: '',
        cartas: []
      })
    }
    console.log(this.players)
  }
  getPlayers(): Player[] {
    return this.players;
  }

  definePlayers(players: Player[]){
    this.players = players;
  }

  
  getPlayersExcept(playerAtual: any): Player[] {
    var result = [];
    for (let index = 0; index < this.players.length; index++) {
      const element = this.players[index];
      if(element != playerAtual){
        result.push(element);
      }
    }
    return result;
  }

  playCard(cartaAJogar, playerAtual: Player) {
    this.players.forEach(element => {
      if(element == playerAtual){
        this.takeCard(cartaAJogar,playerAtual);
      }
    })
  }

  takeCard(card, player:Player){
    var newArray = [];
    if(card.includes("MAIS4")){
      card = "MAIS4";
    }
    if(card.includes("MUDACOR")){
      card = "MUDACOR";
    }
    let naoTira = false;
    player.cartas.forEach(pCard => {
      var aux = `${pCard.color}${pCard.number}`;
      if(aux != card || naoTira){
        newArray.push(pCard);
      }else{
        naoTira = true;
      }
    })
    player.cartas = newArray;
  }

  addCard(playerAtual, card){
    for (let index = 0; index < this.players.length; index++) {
      const element = this.players[index];
      if(element == playerAtual){
        this.players[index].cartas.push(card);
      }
    }
  }
  verificaVencedor(){
    for (let index = 0; index < this.players.length; index++) {
      const element = this.players[index];
      if(element.cartas.length == 0){
        return element;
      }
    }
    return null;
  }

  clear(){
    this.players = [];
  }
}
