import { Component } from '@angular/core';
import { HeaderComponent } from "../../comman/header/header.component";
import { SideBarComponent } from "../../comman/side-bar/side-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, SideBarComponent]
})
export class HomeComponent {

}
