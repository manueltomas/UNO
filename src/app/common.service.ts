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
}
