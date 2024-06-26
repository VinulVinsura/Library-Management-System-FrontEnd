import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../comman/header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
      this.router.navigate(['/home']);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Hello..",
        showConfirmButton: false,
        timer: 1500
      });
    
      
    }else{
          
      Swal.fire({
        icon: "error",
        title: "Can't access this User.. ",
        text: "please chack your user name and password !",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      
    }
  })
 }


}
