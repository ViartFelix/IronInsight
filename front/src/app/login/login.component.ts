import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
      UserService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  private _loginForm: any;

  constructor(
    @Inject(UserService) private userService: UserService,
  ) {
  }

  public ngOnInit(): void
  {
    this._loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])
    });
  }

  public onSubmit(): void
  {
    if(this._loginForm.valid)
    {
      const data = this._loginForm.value;

      const userReq = {
        username: data.username,
        password:  data.password,
      } as User;

      this.userService.loginUser(userReq).subscribe((res: any) => {
          console.log(res);
        },
        (err: any) => {
          console.log(err);
        }
      )
    }
  }

  get loginForm(): any { return this._loginForm; }
}
