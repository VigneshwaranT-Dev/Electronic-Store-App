import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'es-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit{
  @Input() esSignupForm!: FormGroup;
  @Input() isSubmitted!: any;
  @Output() outputEmitter = new EventEmitter<any>;

  constructor() {}

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

  valueChangesHandler() {
    this.esSignupForm.get('esUserMobNum')?.valueChanges.subscribe((response: any) => {
      if(response.length < 10) {
        this.esSignupForm.get('esUserMobNum')?.setErrors({ invalidMobNum: true });
      }
    })
  }
}
