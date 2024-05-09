import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private http;
  public bookList:any={};

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
        console.log(data);
        this.bookList=data;
      });
  }
}
