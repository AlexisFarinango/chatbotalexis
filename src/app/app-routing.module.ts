import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);

// Automatically log in users
const redirectLoggedInToChat = () => redirectLoggedInTo(['/chat']);

// const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//   },
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'modal',
//     loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),...canActivate(redirectLoggedInToChat),
//   },
//   {
//     path: 'chat',
//     ...canActivate(redirectUnauthorizedToLogin),
//     loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
//   },
// ];
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToChat),
  },
  {
    path: 'chat',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
