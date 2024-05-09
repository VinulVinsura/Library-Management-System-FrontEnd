import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./comman/header/header.component";
import { SideBarComponent } from './comman/side-bar/side-bar.component';
import { BookListComponent } from './page/book-list/book-list.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent,SideBarComponent,BookListComponent]
})
export class AppComponent {
  title = 'library-manage-app';
}
