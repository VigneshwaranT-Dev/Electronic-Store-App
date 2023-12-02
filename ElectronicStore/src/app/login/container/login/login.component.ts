import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { IFormObject } from 'src/app/models/form-object.model';
import { LoginService } from '../../services/login.service';
import { FormUtilService } from '../../services/form-utility.service';
import { esLoginFormObject } from '../forms/loginForm.form';

@Component({
  selector: 'es-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hashPassword(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  }

  public esLoginFormEntity: IFormObject = esLoginFormObject;
  public esLoginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formUtilService: FormUtilService
  ){}

  ngOnInit() {
    this.formBuilder();
    const password = 'yourPassword';
    const hashedPassword = this.hashPassword(password);
    console.log('Original Password:', password);
    console.log('Hashed Password:', hashedPassword);
  }

  formBuilder() {
    this.esLoginForm = this.formUtilService.buildFormGroup(this.esLoginFormEntity);
  }

  outputEmitter(event: any){
    switch(event.name){
      case 'SUBMIT_LOGIN': {
        const payload = {
          esUserName: event.value.esUserName,
          esPassword: event.value.esPassword
        }
        this.loginService.loginUser(payload).subscribe((res: any) => {
          console.log(res)
        })
      }
    }
  }
}
