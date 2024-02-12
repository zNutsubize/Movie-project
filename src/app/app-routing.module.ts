import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LoginGuardGuard } from './core/guards/login-guard.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { MovieComponent } from './features/main/movie/movie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/signup/signup.module').then((m) => m.SignupModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
