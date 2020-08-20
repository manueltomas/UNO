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
    //this.monte.push(this.baralho.pop());
    var aux1 = [];
    var aux2 = this.baralho.pop();
    while(aux2.color === ""){
      aux1.push(aux2);
      aux2 = this.baralho.pop();
    }
    aux1.forEach(aux3 => {
      this.baralho.push(aux3);
    })
    this.monte.push(aux2);
    console.log(this.monte);
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

  playCard(card){
    var aux = [];
    this.jogadores.forEach(aux1 => {
      var nomeCard = `${aux1.color}${aux1.number}`
      if(nomeCard != card){
        aux.push(aux1);
      }else{
        this.monte.push(aux1);
      }
    })
    this.jogadores = aux;
  }

  verificaRegra(carta:string, topo:Card){
    var aux = `${topo.color}${topo.number}`;
    if(carta.includes("MAIS4") || carta.includes("MUDACOR")){
      return true;
    }
    if(!carta.includes(topo.color) && !carta.includes(topo.number)){
      alert("Não pode jogar esta carta!");
      return false;
    }
    return true;
  }

  tiraCarta(){
    var aux = this.baralho.pop();
    this.jogadores.push(aux);
    return aux;
  }

  restart(){
    this.baralho = [];
    this.monte = [];
    this.jogadores = [];
  }
}
