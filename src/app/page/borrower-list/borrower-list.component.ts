import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../comman/header/header.component";
import { SideBarComponent } from "../../comman/side-bar/side-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-borrower-list',
    standalone: true,
    templateUrl: './borrower-list.component.html',
    styleUrl: './borrower-list.component.css',
    imports: [HeaderComponent, SideBarComponent,FormsModule,CommonModule,HttpClientModule]
})
export class BorrowerListComponent implements OnInit {
  
  public borrowerList:any=[]
  private basePath:any="http://localhost:8081/api/borrower"
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.lodeBorrowerTable();
  }

  lodeBorrowerTable(){
      this.http.get(this.basePath+"/getAllBorrowers").subscribe((data)=>{
        console.log(data);
        this.borrowerList=data;
      })
  }

  deleteBorrower(borrower:any){
    console.log(borrower.username);
    this.http.delete("http://localhost:8081/api/borrower/deleteBorrower/"+borrower.username).subscribe((data)=>{
      console.log(data);
      console.log("vinul")
      this.lodeBorrowerTable();
    })
  }

  deleteConfimationAlet(borrower:any){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBorrower(borrower);
       
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  setSelectBook(borrower:any){}

}
