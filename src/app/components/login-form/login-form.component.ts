import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {StorageSessionService} from "../../service/storage-session.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../service/loader.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  public error = false;
  public hide = true;
  public form: FormGroup;
  public isLoading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private storageService: StorageSessionService,
              private router: Router, private loadingService: LoaderService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadingService.onToggleLoading().subscribe((status: boolean) => {
      this.isLoading = status;
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
          this.form.reset();
          this.router.navigate(['/home']);
          // this.reloadPage();
        },
        error: (error) => {
          if (error.status === 400) {
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 5000);
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
