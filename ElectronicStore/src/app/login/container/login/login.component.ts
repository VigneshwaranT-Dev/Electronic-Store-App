import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { IFormObject } from 'src/app/models/form-object.model';
import { LoginService } from '../../services/login.service';
import { FormUtilService } from '../../services/form-utility.service';
import { esLoginFormObject } from '../forms/loginForm.form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'es-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public esLoginFormEntity: IFormObject = esLoginFormObject;
  public esLoginForm!: FormGroup;

  public isSubmitted = false;

  constructor(
    private loginService: LoginService,
    private formUtilService: FormUtilService,
    private toastrService: ToastrService
  ){}

  ngOnInit() {
    this.formBuilder();
  }

  formBuilder() {
    this.esLoginForm = this.formUtilService.buildFormGroup(this.esLoginFormEntity);
  }

  outputEmitter(event: any){
    switch(event.name){
      case 'SUBMIT_LOGIN': {
        this.showErrors();
        this.isSubmitted = true;
        const hashedPassword = this.hashPassword(event.value.esPassword);
        const payload = {
          esUserName: event.value.esUserName,
          esPassword: hashedPassword
        }
        if(this.esLoginForm.dirty && this.esLoginForm.valid) {
          this.loginService.loginUser(payload).subscribe((res: any) => {});
        }
      }
    }
  }

  showErrors() {
      const formControl = this.esLoginForm.controls
      const formObject = this.esLoginFormEntity

      for (const key in formControl) {
        if (formControl.hasOwnProperty(key)) {
          if (formControl[key].errors !== null) {
            for (const item in formControl[key].errors) {
              if (formObject[key].validations !== null) {
                const validations: any[] = formObject[key].validations;
                validations.forEach((er) => {
                  this.toastrService.error(er.message, '', {
                    closeButton: true,
                    positionClass: 'toast-top-center',
                    timeOut: 3000,
                    progressBar: true,
                  });
                });
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
