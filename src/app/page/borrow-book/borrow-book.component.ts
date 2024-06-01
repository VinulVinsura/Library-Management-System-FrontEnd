import { Component } from '@angular/core';
import { HeaderComponent } from "../../comman/header/header.component";

@Component({
    selector: 'app-borrow-book',
    standalone: true,
    templateUrl: './borrow-book.component.html',
    styleUrl: './borrow-book.component.css',
    imports: [HeaderComponent]
})
export class BorrowBookComponent {

}
