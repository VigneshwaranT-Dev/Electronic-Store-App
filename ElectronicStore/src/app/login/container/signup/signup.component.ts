import { Component, OnInit } from '@angular/core';
import { IFormObject } from 'src/app/models/form-object.model';
import { esSignupFormObject } from '../forms/signup.form';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { FormUtilService } from '../../services/form-utility.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'es-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public esSignupFormEntity: IFormObject = esSignupFormObject;
  public esSignupForm!: FormGroup;
  public esUsersList!: any;

  public isSubmitted = false;

  constructor(
    private loginService: LoginService,
    private formUtilService: FormUtilService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.formBuilder();
  }

  formBuilder() {
    this.esSignupForm = this.formUtilService.buildFormGroup(this.esSignupFormEntity);
  }

  outputEmitter(event: any) {
    switch(event.name){
      case 'SUBMIT_SIGNUP': {
        console.log(this.esSignupForm)
        this.showErrors();
        this.isSubmitted = true;
        const hashedPassword = this.hashPassword(event.value.esPassword);
        const hashedConfPassword = this.hashPassword(event.value.esConfPassword);

        const payload = {
          esFirstName: event.value.esFirstName,
          esUserName: event.value.esUserName,
          esLastName: event.value.esLastName,
          esEmailId: event.value.esEmailId,
          esUserMobNum: event.value.esUserMobNum,
          esPassword: hashedPassword,
          esConfPassword: hashedConfPassword,
        }
        if(this.esSignupForm.dirty && this.esSignupForm.valid) {
          this.loginService.signupUser(payload).subscribe((res: any) => {
            if(res !==  null){
              this.esSignupForm.patchValue(
                {
                  esFirstName: '',
                  esLastName: '',
                  esUserName: '',
                  esEmailId: '',
                  esUserMobNum: '',
                  esPassword: '',
                  esConfPassword: ''
                }
              )
            }
          });
        }
      }
    }
  }

  showErrors() {
    const formControl = this.esSignupForm.controls
    const formObject = this.esSignupFormEntity

    for (const key in formControl) {
      if (formControl.hasOwnProperty(key)) {
        if (formControl[key].errors !== null) {
          for (const item in formControl[key].errors) {
            if (formControl[key].errors?.hasOwnProperty(item)) {
              if (formObject[key].validations !== null) {
                const validations: any[] = formObject[key].validations;
                validations.forEach((er) => {
                  if(item == er.validator){
                    this.toastrService.error(er.message, '', {
                      closeButton: true,
                      positionClass: 'toast-top-center',
                      timeOut: 3000,
                      progressBar: true,
                    });
                  }
                });
              }
            }
          }
        }
      }
    }
  return
}

  hashPassword(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  }
}
