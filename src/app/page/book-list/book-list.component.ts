import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { text } from 'stream/consumers';
import bootstrap from '../../../main.server';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  public toastLiveExample = document.getElementById('liveToast')
  private http;
  public bookList: any = {};
  public selectBook: any = '';
  public toastBootstrap:any;
  

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  ngOnInit(): void {
    this.lodeBookTable();
  }



  lodeBookTable() {
    this.http
      .get('http://localhost:8080/api/book/getBookList')
      .subscribe((data) => {
        this.bookList = data;
        this.selectBook = '';
      });
  }

  public removeBook() {
    this.http
      .delete(
        'http://localhost:8080/api/book/deletebook/' + this.selectBook.id,
        { responseType: 'text' }
      ) // We handle response Type
      .subscribe((data) => {
        console.log(data);
        
        this.lodeBookTable();
      });
  }

  public alet(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to remove this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.removeBook();
        Swal.fire({
          title: "Deleted!",
          text: "Your Book has been deleted.",
          icon: "success"
        });
      }
    });
  }

  public updataBook() {
    this.http.post("http://localhost:8080/api/book/addBook",this.selectBook)
    .subscribe((data)=>{
      Swal.fire({
        title: "Good job..Book updated !",
        text: "You clicked the button!",
        icon: "success"
      });
      this.lodeBookTable();
    })
  }

  setSelectBook(book: any) {
    this.selectBook = book;
    this.alet();
    console.log(book);
  }
}
