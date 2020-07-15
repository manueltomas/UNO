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
