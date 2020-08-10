import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-choice',
  templateUrl: './name-choice.component.html',
  styleUrls: ['./name-choice.component.css']
})
export class NameChoiceComponent implements OnInit {

  players = [];
  constructor(
    private router : Router,
    private service: CommonService) { }

  ngOnInit(): void {
    this.players = this.service.getPlayers();
    if(this.players.length == 0){
      this.router.navigate(["/inicial"]);
      return;
    }
    for (let index = 0; index < this.players.length; index++) {
      const element = this.players[index];
      element.name = `Player ${index+1}`;
    }
  }

  getNumPlayer(player){
    for(var i = 1; i <= this.players.length; i++){
      if(this.players[i-1] == player){
        return i;
      }
    }
    return 0;
  }
  submit(){
    this.service.definePlayers(this.players);
    this.router.navigate(["/game"])
  }
}
