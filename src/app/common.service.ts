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
}
