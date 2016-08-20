import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AppRouter} from './routes';
import {AuthService} from './auth.service';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddclientComponent} from './addclient/addclient.component';
import {BooksComponent} from './books/books.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, DashboardComponent, AddclientComponent, BooksComponent],
    imports: [BrowserModule, HttpModule, RouterModule, FormsModule, AppRouter],
    providers: [AuthService],
    bootstrap: [AppComponent]
})

export class AppModule {}