import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { BoardsWrapperComponent } from './boards-wrapper/boards-wrapper.component';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { CommonModule } from '@angular/common';
import { RegistriesComponent } from './registry-boards/registries/registries.component';
import { SummariesComponent } from './registry-boards/summaries/summaries.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddRegistryModalComponent, DialogElementsExampleDialog } from './registry-boards/add-registry-modal/add-registry-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRegistryModalComponent } from './registry-boards/edit-registry-modal/edit-registry-modal.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingComponent } from './home/landing/landing.component';
import { AuthWrapperComponent } from './auth/auth-wrapper/auth-wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    BoardsWrapperComponent,
    RegistriesComponent,
    SummariesComponent,
    SidebarComponent,
    AddRegistryModalComponent,
    DialogElementsExampleDialog,
    EditRegistryModalComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    AuthWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
