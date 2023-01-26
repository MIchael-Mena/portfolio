import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  hide = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  OnSubmit() {
    /*    if (this.form.valid) {
          this.submitEM.emit(this.form.value);
        }*/
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password);
    }
  }

  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
