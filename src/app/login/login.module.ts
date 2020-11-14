import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
