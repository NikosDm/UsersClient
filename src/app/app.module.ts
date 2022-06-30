import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { LabelModule } from '@progress/kendo-angular-label';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { NotificationModule } from '@progress/kendo-angular-notification';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserDetailsComponent,
    NotFoundComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    GridModule,
    LabelModule,
    HttpClientModule,
    NavigationModule,
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
