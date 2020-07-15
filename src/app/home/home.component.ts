import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nPlayers = 2;
  constructor(
    private router : Router,
    private service: CommonService){}
  ngOnInit(){

  }
  start(){
    /*var input:any = document.getElementById('nPlayers');*/
    this.service.setPlayers(this.nPlayers);
    this.router.navigate(['/name-choice']);
  }

}
