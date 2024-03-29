import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

import { constant } from '../../../shared/constant';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  isUpdateProfileLoading = false;
  isUpdatePasswordLoading = false;
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private titleService: Title,
    private fb: UntypedFormBuilder,
    private customerService: CustomerService,
    private messageService: NzMessageService
  ) {
    this.titleService.setTitle('Thông tin tài khoản | OlympicBooks');
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(constant.pwdPattern)]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]]
    });

    this.customerService.getMe().subscribe((response) => {
      this.profileForm.setValue({
        email: response.email,
        name: response.name,
        address: response.address,
        phoneNumber: response.phoneNumber
      });
    });
  }

  submitProfileForm() {
    const { email, ...data } = this.profileForm.value;
    this.toggleDisableFormControl(this.profileForm, true, ['email']);
    this.isUpdateProfileLoading = true;
    this.customerService
      .updateMe(data)
      .pipe(
        finalize(() => {
          this.isUpdateProfileLoading = false;
          this.toggleDisableFormControl(this.profileForm, false, ['email']);
        })
      )
      .subscribe(
        (response) => {
          this.profileForm.patchValue({
            name: response.name,
            address: response.address,
            phoneNumber: response.phoneNumber
          });
          this.profileForm.markAsPristine();
          this.profileForm.updateValueAndValidity();
          this.messageService.success('Cập nhật hồ sơ thành công!');
        },
        (error) => this.messageService.error('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!')
      );
  }

  submitPasswordForm() {
    const password = this.passwordForm.value['password'];
    this.isUpdatePasswordLoading = true;
    this.toggleDisableFormControl(this.passwordForm, true);
    this.customerService
      .updateMe({ password })
      .pipe(
        finalize(() => {
          this.isUpdatePasswordLoading = false;
          this.toggleDisableFormControl(this.passwordForm, false);
        })
      )
      .subscribe(
        (response) => {
          this.passwordForm.reset();
          this.passwordForm.updateValueAndValidity();
          this.messageService.success('Cập nhật mật khẩu thành công!');
        },
        (error) => this.messageService.error('Có lỗi xảy ra, vui lòng tải lại trang và thử lại!')
      );
  }

  toggleDisableFormControl(form: UntypedFormGroup, value: Boolean, exclude = []) {
    const state = value ? 'disable' : 'enable';
    Object.keys(form.controls).forEach((controlName) => {
      if (!exclude.includes(controlName)) {
        form.controls[controlName][state]();
        form.controls[controlName].updateValueAndValidity();
      }
    });
  }

  updateConfirmValidator() {
    Promise.resolve().then(() => this.passwordForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) return { required: true };
    else if (control.value !== this.passwordForm.controls.password.value)
      return { confirm: true, error: true };
    return {};
  };
}
