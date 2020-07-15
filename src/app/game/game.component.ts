import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(
    private cards: CardService,
    private service: CommonService) { }

  ngOnInit(): void {
    this.cards.criaBaralho();
    this.service.players.forEach(player => {
      player.cartas = this.cards.getJogo();
    });
    console.log(this.service.players);
  }

}
