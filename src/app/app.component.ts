import { Component, OnInit } from '@angular/core';
import { AuthService } from './AuthService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // template: `
  //   <div id="message">{{ message }}</div>
  // `
})
export class AppComponent implements OnInit{
  title = 'app-tenancy';
  message: string = '';
  data:any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.onAuthStateChanged((user) => {
      if (user) {
        console.log({user});
        this.data = user;

        this.message = `Welcome, ${user.email}`;
      } else {
        this.message = 'No user signed in.';
      }
    });

    this.signIn();
  }
  signIn(): void {
    const email = 'andres.arevalo@imexhs.com';
    const password = 'andres.arevalo@imexhs.com';

    this.authService.signIn(email, password)
      .catch((error) => {
        this.message = error.message;
      });
  }



}
