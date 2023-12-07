import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'es-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  @Input() esSignupForm!: FormGroup;
  @Input() isSubmitted!: any;
  @Input() esUsersList!: any;
  @Output() outputEmitter = new EventEmitter<any>;

  public userAvailableMsg!: any;
  public isUserAvailable!: boolean;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.valueChangesHandler();
  }

  submitForSignup() {
    const events: any = {
      name: 'SUBMIT_SIGNUP',
      component: 'SignupFormComponent',
      value: this.esSignupForm.value,
    }
    this.outputEmitter.emit(events);
  }

  convCapBlur(event: any) {
    const lowercaseString: string = event.target.value;
    const uppercaseString: string = lowercaseString.toUpperCase();

    this.esSignupForm.get('esUserName')?.patchValue(uppercaseString);
  }

  valueChangesHandler() {
    this.esSignupForm.get('esUserMobNum')?.valueChanges.subscribe((response: any) => {
      if(response.length < 10 && response.length !== 0) {
        this.esSignupForm.get('esUserMobNum')?.setErrors({ invalidMobNum: true });
      } else if (response.length === 0) {
        this.esSignupForm.get('esUserMobNum')?.setErrors({ required: true });
      }
    })

    this.esSignupForm.get('esUserName')?.valueChanges.subscribe((response: any) => {
      if(response.length < 5 && response.length !== 0) {
        this.esSignupForm.get('esUserName')?.setErrors({ min: true });
      } else {
        const payload = {
          getUsers: response
        }
        this.loginService.getUsers(payload).subscribe((res: any) => {
          if(res.status === 2) {
            this.userAvailableMsg = res.message;
            this.isUserAvailable = true;
          } else {
            this.userAvailableMsg = res.message;
            this.isUserAvailable = false;
            this.esSignupForm.get('esUserName')?.setErrors({ userExists: true });
          }
        })
      }
    })

    this.esSignupForm.get('esConfPassword')?.valueChanges.subscribe((response: any) => {
      if((this.esSignupForm.get('esPassword')?.value !== response) &&
          this.esSignupForm.get('esPassword')?.value !== "" &&
          this.esSignupForm.get('esConfPassword')?.value !== "") {
        this.esSignupForm.get('esConfPassword')?.setErrors({ notSamePass: true });
      }
    })

    this.esSignupForm.get('esPassword')?.valueChanges.subscribe((response: any) => {
      if((this.esSignupForm.get('esConfPassword')?.value !== response) &&
          this.esSignupForm.get('esConfPassword')?.value !== "" &&
          this.esSignupForm.get('esPassword')?.value !== "") {
        this.esSignupForm.get('esConfPassword')?.setErrors({ notSamePass: true });
      } else if (this.esSignupForm.get('esConfPassword')?.value === response) {
        this.esSignupForm.get('esConfPassword')?.setErrors(null);
      }
    })
  }
}
