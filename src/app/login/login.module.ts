import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [LoginComponent, PasswordRecoveryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
