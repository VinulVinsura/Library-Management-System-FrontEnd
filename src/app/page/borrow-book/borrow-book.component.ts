import { Component } from '@angular/core';
import { HeaderComponent } from "../../comman/header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  public userDatils:any="";
  public bookId:any="";
  public selectBookList:any=[];
  public book:any;
  public confirmObj:any;

  searchUser(){
    console.log(this.userName);
    this.http.get(`http://localhost:8081/api/borrower/searchByUserName/${this.userName}`).subscribe((data)=>{
      console.log(data);
      this.userDatils=data
    })
  }

  searchBook(){
    console.log(this.bookId);
    this.http.get(`http://localhost:8080/api/book/search/${this.bookId}`).subscribe((res)=>{
      this.book=res
      Swal.fire({
        title: `Do you want to "${this.book.title}" Book ?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.selectBookList.push(res);
          this.confirmObj=res;
          console.log(this.selectBookList);
          Swal.fire("Add to card !", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Not Added !", "", "info");
        }
      });
      
    
    })
  }

}
