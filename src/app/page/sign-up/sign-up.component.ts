import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StringDecoder } from 'node:string_decoder';
import { text } from 'stream/consumers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private http;
  public contrieList: any = [];
  public selectCountryCode: any;

  borrower = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    country: null,
    phoneNum: null,
  };

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.lodeCountries();
  }

  public lodeCountries() {
    let api = 'https://restcountries.com/v3.1/all';

    this.http.get(api).subscribe((data) => {
      this.contrieList = data;
      console.log(this.contrieList);
    });
  }

  public setCountry(country: any) {
    this.selectCountryCode = country.idd.root + country.idd.suffixes[0];
    console.log(this.selectCountryCode);
    this.borrower.country = country.name.common;
  }

  public registerBorrower() {
    this.http
      .get(
        'http://localhost:8081/api/borrower/isExistsByUserName/' +
          this.borrower.username,
        { responseType: 'text' }
      )
      .subscribe((data: any) => {
        if (data == 'false') {
          Swal.fire({
            title: 'Do you want to Save.!  ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Borrower Saved!', '', 'success');
              let api = 'http://localhost:8081/api/borrower/addBorrower';
              this.http.post(api, this.borrower).subscribe((data) => {
                console.log(data);
              });

              this.borrower = {
                username: null,
                password: null,
                firstName: null,
                lastName: null,
                email: null,
                address: null,
                country: null,
                phoneNum: null,
              };
            } else if (result.isDenied) {
              Swal.fire('Changes are not Saved', '', 'info');
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: "Can't Save Borrower..",
            text: 'Already Saved this Username!',
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      });
  }
}
