import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddclientComponent} from './addclient/addclient.component';
import {BooksComponent} from './books/books.component';


export const appRoutes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'login', component:LoginComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: 'addclient', component:AddclientComponent},
    {path: 'books', component:BooksComponent},
    
]

export const AppRouter = RouterModule.forRoot(appRoutes);