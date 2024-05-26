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
  public isExists:boolean=true;
  id = 'BR0';
  i = 0;
  borrower = {
    borrower_Id: 'dvdd',
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
        { responseType:"text" }
      )
      .subscribe((data) => {
        console.log(data)
        
        if (data=="false") {
          this.borrower.borrower_Id = this.id + ++this.i;
          let api = 'http://localhost:8081/api/borrower/addBorrower';
          this.http.post(api, this.borrower).subscribe((data) => {
            console.log(data);
          });
          Swal.fire({
            title: "Borrower Saved!",
            text: "You clicked the button!",
            icon: "success"
          });

          this.borrower = {
            borrower_Id: '',
            username: null,
            password: null,
            firstName: null,
            lastName: null,
            email: null,
            address: null,
            country: null,
            phoneNum: null,
          };
        } else {
          Swal.fire({
            icon: "error",
            title: "Can't Save Borrower..",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
  }
}
