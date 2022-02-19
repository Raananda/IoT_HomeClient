import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { MainViewComponent } from './main-view/main-view.component';
import { HomeComponent } from './main-view/pages/home/home.component';
import { SwitchesComponent } from './main-view/pages/switches/switches.component';
import { SigninComponent } from './security/pages/signin/signin.component';
import { SecurityComponent } from './security/security.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/main-view/switches', pathMatch: 'full' },
  { path: 'main-view', redirectTo: '/main-view/home', pathMatch: 'full' },

  {
    path: 'main-view',
    component: MainViewComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
      { path: 'switches', component: SwitchesComponent, canActivate:[AuthGuard]}

    ]
  },
  {
    path: 'security',
    component: SecurityComponent,
    children: [
      { path: 'signin', component: SigninComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
