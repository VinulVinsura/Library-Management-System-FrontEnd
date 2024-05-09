import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { BookListComponent } from './page/book-list/book-list.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"bookList",
        component:BookListComponent
    }
];
