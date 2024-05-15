import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  private http;
  public contrieList:any=[];

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.lodeCountries();
  }

  public lodeCountries() {
    let api = 'https://restcountries.com/v3.1/all';
    this.http.get(api).subscribe((data) => {
      this.contrieList=data;
      console.log(this.contrieList);
    });
  }
}
