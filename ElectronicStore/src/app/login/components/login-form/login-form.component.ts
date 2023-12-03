import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'es-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() esLoginForm!: FormGroup;
  @Input() isSubmitted!: any;
  @Output() outputEmitter = new EventEmitter<any>;

  constructor(){}

  ngOnInit(): void {}

  submitLogin() {
    const events: any = {
      name: 'SUBMIT_LOGIN',
      component: 'LoginFormComponent',
      value: this.esLoginForm.value,
    }
    this.outputEmitter.emit(events);
  }
}
