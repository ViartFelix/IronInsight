import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  private readonly duration: number = 100

  constructor(
    @Inject(UserService) private userService: UserService,
    private _snackBar: MatSnackBar
  ) {
  }

  public ngOnInit(): void {
    this._loginForm = new FormGroup({
      userOrEmail: new FormControl('', [
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

  public onSubmit(): void {
    if (this._loginForm.valid) {
      const data = this._loginForm.value;

      //not casted as user for the back, as it need user or email as the same field.
      const userReq = {
        userOrEmail: data.userOrEmail,
        password: data.password,
      };

      this.userService.loginUser(userReq).subscribe((res: any) => {
          this._snackBar.open(`Hello, ${res.data.username}`, 'OK', {
            duration: this.duration * 1000,
            panelClass: ["success"]
          });
        },
        (err: any) => {
          console.log(err)
          this._snackBar.open(err.error.message, 'OK',{
            duration: this.duration * 1000,
            panelClass: ["error"]
          });
        }
      )
    }
  }

  get loginForm(): any {
    return this._loginForm;
  }
}
