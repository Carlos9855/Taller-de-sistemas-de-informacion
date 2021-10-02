import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService],
})

export class RegisterComponent {
  registerForm = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});

  constructor(private authSvc:AuthService, private router: Router) { }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password);
      if(user){
        this.router.navigate(['/home']);
      }
    } catch (error) {

    }
  }
};
