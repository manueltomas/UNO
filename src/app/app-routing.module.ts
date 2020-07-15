import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NameChoiceComponent } from './name-choice/name-choice.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  {path: '', redirectTo: '/inicial', pathMatch: 'full'},
  {path: 'inicial', component: HomeComponent},
  {path: 'name-choice', component: NameChoiceComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
