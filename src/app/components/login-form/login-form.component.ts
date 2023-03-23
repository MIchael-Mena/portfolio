import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {StorageSessionService} from "../../service/storage-session.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public error = false;
  public hide = true;
  public form: FormGroup;
  public isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private storageService: StorageSessionService,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public get controlEmail(): any {
    return this.form.controls['email'];
  }

  public get controlPassword(): any {
    return this.form.controls['password'];
  }

  OnSubmit() {
    this.isLoading = true;
    if (this.form.invalid) {
      this.isLoading = false;
      return;
    }
    const {email, password} = this.form.value;
    this.authService.login(email, password).subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);
          this.form.reset();
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if (error.status === 400 || error.status === 401) {
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 5000);
          }
          this.isLoading = false;
        }
      }
    );

  }

}
