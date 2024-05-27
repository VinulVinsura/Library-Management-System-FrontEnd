import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BookListComponent } from './page/book-list/book-list.component';
import { LoginComponent } from './page/login/login.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { BorrowerListComponent } from './page/borrower-list/borrower-list.component';

export const routes: Routes = [
   
    {
        path:"",
        component:HomeComponent
       
     },
    {
        path:"bookList",
        component:BookListComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signUp",
        component:SignUpComponent
    },
    {
        path:"borrowerList",
        component:BorrowerListComponent
    }
   
];
