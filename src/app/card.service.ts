import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  numeroUm = ["ZERO"]
  numeroDois = ["UM",
            "DOIS",
            "TRES",
            "QUATRO",
            "CINCO",
            "SEIS",
            "SETE",
            "OITO",
            "NOVE",
            "NAOJOGA",
            "TROCASENTIDO",
            "MAIS2"]
  especiais = ["MAIS4", "MUDACOR"]
  cor = ["VERMELHO", "AMARELO", "AZUL", "VERDE"]

  baralho:Card[] = []
  jogadores:Card[] = []
  monte:Card[] = []

  constructor() { }

  criaBaralho(){
    this.numeroUm.forEach(n1 => {
      this.cor.forEach(c1 =>{
        this.baralho.push({
          number: n1,
          color: c1
        })
      })
    })
    this.numeroDois.forEach(n2 => {
      this.cor.forEach(c1 =>{
        this.baralho.push({
          number: n2,
          color: c1
        })
      })
      this.cor.forEach(c1 =>{
        this.baralho.push({
          number: n2,
          color: c1
        })
      })
    })
    this.especiais.forEach(e => {
      this.baralho.push({
        number: e,
        color: ""
      })
      this.baralho.push({
        number: e,
        color: ""
      })
      this.baralho.push({
        number: e,
        color: ""
      })
      this.baralho.push({
        number: e,
        color: ""
      })
    })
    this.baralho = this.shuffle(this.baralho);
    console.log(this.baralho);
  }

  getJogo(){
    var result = [];
    for(var i = 0; i < 7; i++){
      var a = this.baralho.pop();
      this.jogadores.push(a);
      result.push(a);
    }
    return result;
  }


  shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }
}
