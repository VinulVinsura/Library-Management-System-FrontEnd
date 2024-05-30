import { Component } from '@angular/core';
import {  RouterLink ,Router} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router:Router){}
  private timerInterval:any
  private timer:any=""
  logOut() {
  
    Swal.fire({
      title: 'LOG OUT..!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
         this.timer = Swal.getPopup()?.querySelector('b');
        this.timerInterval = setInterval(() => {
          this.timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(this.timerInterval);
        this.router.navigate(['/login'])
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }
}
