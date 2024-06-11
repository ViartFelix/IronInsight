import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  providers: [
    UserService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  constructor(
    @Inject(UserService) private userService: UserService
  ) {
  }

  private _registerForm: any;

  ngOnInit() {
    this._registerForm = new FormGroup({
      username: new FormControl('jean', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('jean@michel',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('jean', [
        Validators.required
      ])
    });
  }


  public onRegisterSubmit() {
    if(this._registerForm.valid) {
      //take all form data
      const data = this._registerForm.value;
      //user request
      const userReq = {
        username: data.username,
        password: data.password,
        email: data.email,
        created_at: new Date(),
        updated_at: new Date()
      } as User

      this.userService.registerUser(userReq).subscribe((data: any) => {
        console.log(data)
      });
    }
  }

  get registerForm(): any { return this._registerForm; }
}
