import { UserprofilComponent } from './userprofil/userprofil.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddskillComponent } from './addskill/addskill.component';
import { LoginComponent } from './login/login.component';
import { MyskillComponent } from './myskill/myskill.component';
import { SkillsComponent } from './skills/skills.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"addskill",component:AddskillComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"myskill",component:MyskillComponent},
  {path:"skills",component:SkillsComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"profil",component:UserprofilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
