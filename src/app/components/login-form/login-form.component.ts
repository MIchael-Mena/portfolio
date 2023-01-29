import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  public error = false;
  public hide = true;
  public form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public get controlEmail(): any {
    return this.form.controls['email'];
  }

  public get controlPassword(): any {
    return this.form.controls['password'];
  }

  OnSubmit() {
    if (this.form.invalid) {
      return;
    }
    const {email, password} = this.form.value;
    this.authService.login(email, password).subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);
          this.reloadPage();
        },
        error: (error) => {
          if (error.status === 400) {
            this.error = true;
          } else {
            console.log(error.message);
          }
        }
      }
    );

  }

  private reloadPage(): void {
    window.location.reload();
  }

}
