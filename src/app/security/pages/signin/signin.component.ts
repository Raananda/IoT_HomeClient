import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SecurityService } from 'src/app/core/services/security.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private securityService: SecurityService,
    private router: Router
  ) {
    this.RegisterFlag = false;
  }


  RegisterErrorMessege!: any;
  LoginErrorMessege!: any;

  RegisterFlag!: boolean;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 3, rows: 1 }
        ];
      }

      return [
        { title: '', cols: 1, rows: 1 }
      ];
    })
  );


  loginForm = this.fb.group({
    UserName: [null, Validators.required],
    Password: [null, Validators.required]
  });

  registerForm = this.fb.group({
    UserName: [null, Validators.required],
    Password: [null, Validators.required]
  });

  ngOnInit(): void {
    // // remove in prod
    // this.loginForm.controls["email"].setValue("raanand");
    // this.loginForm.controls["password"].setValue("123456");
    // this.onSubmitLogin();


    if (localStorage.getItem('token') != null)
      this.router.navigate(['']);


  }

  onSubmitLogin(): void {
    this.securityService.Login(this.loginForm.value).subscribe(resp => {
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('');
    },
      error => {
        this.LoginErrorMessege = error.message;
      }
    );
  }

  onSubmitRegister(): void {
    this.securityService.Register(this.registerForm.value).subscribe(resp => {
      //this.router.navigateByUrl('');
      this.RegisterFlag = true;
    },
      error => {
        this.RegisterErrorMessege = error;
      }
    );

  }
}
