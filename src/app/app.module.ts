import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NameChoiceComponent } from './name-choice/name-choice.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    NameChoiceComponent,
    HomeComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
