import { Routes } from "@angular/router";
import { AuthComponent } from "../components/auth/auth.component";
import { RegisterComponent } from "../components/register/register.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  }
];
