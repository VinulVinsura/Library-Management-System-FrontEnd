import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { text } from 'stream/consumers';
import bootstrap from '../../../main.server';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../../comman/header/header.component";
import { SideBarComponent } from "../../comman/side-bar/side-bar.component";
import { log } from 'console';

@Component({
    selector: 'app-book-list',
    standalone: true,
    templateUrl: './book-list.component.html',
    styleUrl: './book-list.component.css',
    imports: [HttpClientModule, FormsModule, CommonModule, HeaderComponent, SideBarComponent]
})
export class BookListComponent implements OnInit {
 
  private http;
  public bookList: any =[];
  public selectBook: any="";
  public toastBootstrap: any;

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
        console.log(this.bookList);
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
        this.selectBook = '';

        this.lodeBookTable();
      });
  }

  public deleteConfimationAlet(book: any) {
    this.selectBook = book;
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to remove "${this.selectBook.title}"`, // ` this simble using string inter collertion in js
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeBook();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your  Book has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  public updataBook() {
    this.http
      .post('http://localhost:8080/api/book/addBook', this.selectBook)
      .subscribe((data) => {
        Swal.fire({
          title: 'Good job..Book updated !',
          text: 'You clicked the button!',
          icon: 'success',
        });
        this.selectBook = '';
        this.lodeBookTable();
      });
  }

  setSelectBook(book: any) {
    this.selectBook = book;
    console.log(book);
  }
}
