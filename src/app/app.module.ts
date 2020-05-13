import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateEventComponent } from './components/generate-event/generate-event.component';
import { JoinEventComponent } from './components/join-event/join-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { CreactorListComponent } from './components/creactor-list/creactor-list.component';
import { ParticipantsListComponent } from './components/participants-list/participants-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UpdateProfileComponent,
    DashboardComponent,
    GenerateEventComponent,
    JoinEventComponent,
    EventListComponent,
    CreactorListComponent,
    ParticipantsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}