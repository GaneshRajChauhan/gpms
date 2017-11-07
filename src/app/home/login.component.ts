import { Component,OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from '../common/toastr.service'
import { AuthService } from '../user/auth.service';

@Component({
  selector:'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
  }
 ngOnInit()
 {
if(this.authService.isLoggedIn())
  {
    this.router.navigate(['']);
  }
 }
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    username: this.username,
    password: this.password,
  });


  loginUser(formdata:any): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value)
        .subscribe(data => {
          if (data.json().success === false) {
            this.toastr.error(data.json().message);
          } else {
            this.toastr.success('Login successful.');
            this.router.navigate(['expense/report']);
          }
          this.loginForm.reset();
        });
    }
  }
  
}
