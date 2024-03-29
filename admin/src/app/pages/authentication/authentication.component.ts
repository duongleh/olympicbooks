import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  signInForm: UntypedFormGroup;
  passwordVisible = false;
  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm(): void {
    this.isLoading = true;
    this.authenticationService.signIn(this.signInForm.value).subscribe(
      (response) => {
        this.isLoading = false;
        this.messageService.success('Đăng nhập thành công!');
        this.router.navigate(['/products']);
      },
      (error) => {
        this.isLoading = false;
        this.messageService.error('Tài khoản không hợp lệ!');
      }
    );
  }
}
