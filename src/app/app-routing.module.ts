import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { GenerateEventComponent } from './components/generate-event/generate-event.component';
import { JoinEventComponent } from './components/join-event/join-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { ParticipantsListComponent } from './components/participants-list/participants-list.component';
import { CreactorListComponent } from './components/creactor-list/creactor-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'updateProfile',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generateEvent',
    component: GenerateEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'joinEvent',
    component: JoinEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventList',
    component: EventListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'participantList',
    component: ParticipantsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'creatorList',
    component: CreactorListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }