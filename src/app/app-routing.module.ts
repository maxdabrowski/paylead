import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//ścieżki do ładowanych leniwie modułów
const routes: Routes = [
  {path:'', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'area', loadChildren: () => import('./area/area.module').then(m => m.AreaModule)},
  {path:'region', loadChildren: () => import('./region/region.module').then(m => m.RegionModule)},
  {path:'agent', loadChildren: () => import('./agent/agent.module').then(m => m.AgentModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
