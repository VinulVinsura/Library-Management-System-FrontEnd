import { Component } from '@angular/core';
import { HeaderComponent } from "../../comman/header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-borrow-book',
    standalone: true,
    templateUrl: './borrow-book.component.html',
    styleUrl: './borrow-book.component.css',
    imports: [HeaderComponent,HttpClientModule,FormsModule,CommonModule]
})
export class BorrowBookComponent {
  constructor(private http:HttpClient){}

  public userName:any;
  public userDatils:any=""

  searchUser(){
    console.log(this.userName);
    this.http.get(`http://localhost:8081/api/borrower/searchByUserName/${this.userName}`).subscribe((data)=>{
      console.log(data);
      this.userDatils=data
    })
  }

}
