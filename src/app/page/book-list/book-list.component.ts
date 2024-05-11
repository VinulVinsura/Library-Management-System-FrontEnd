import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private http;
  public bookList: any = {};
  public selectBook: any="";

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
        this.selectBook="";
      });
  }

  public removeBook() {
    this.http
      .delete('http://localhost:8080/api/book/deletebook/' + this.selectBook.id ,{responseType:"text"})  // We handle response Type
      .subscribe((data) => {
        console.log(data);
        this.lodeBookTable();
       
      });

  }

  setSelectBook(book: any) {
    this.selectBook = book;
   
  }
}
