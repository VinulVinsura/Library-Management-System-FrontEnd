import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../comman/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj={
    "email":null,
    "password":null
  }

 constructor(private http:HttpClient, private router:Router){}

 login(){
  this.http.post("http://localhost:8081/api/login/isValidUser",this.loginObj).subscribe((data:any)=>{
    console.log(this.loginObj);
    if(data==true){
      this.router.navigate(['/borrowerList']);
    }
  })
 }


}
