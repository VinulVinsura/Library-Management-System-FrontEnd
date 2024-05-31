import { Component } from '@angular/core';
import { HeaderComponent } from '../../comman/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
  imports: [HeaderComponent, HttpClientModule, CommonModule, FormsModule],
})
export class AddBookComponent {
  constructor(private http: HttpClient, private route: Router) {}

  book: any = {
    isbn: null,
    title: null,
    category: null,
    price: null,
    qty: null,
  };

  public addBook() {
    console.log(this.book);

    Swal.fire({
      title: `Do you want to "${this.book.title}" Book Save.!  ?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Book Saved..!', '', 'success');
        this.http
          .post('http://localhost:8080/api/book/addBook', this.book)
          .subscribe((data) => {
            console.log(data);
            this.route.navigate(['/bookList']);
          });

          this.book = {
            isbn: null,
            title: null,
            category: null,
            price: null,
            qty: null,
          };
        
      } else if (result.isDenied) {
        Swal.fire('Changes are not Saved', '', 'info');
      }
    });
  }
}
