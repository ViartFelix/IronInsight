import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import AuthService from "../../services/auth.service";
import {User} from "../../models/User";
import { catchError, of } from 'rxjs';

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
    UserService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  private _loginForm: any;
  private readonly duration: number = 5

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(AuthService) private authService: AuthService,
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

      this.userService.loginUser(userReq).pipe(
        catchError((error: any) => {
          this._snackBar.open(error.error.message, 'OK', {
            duration: this.duration * 1000,
            panelClass: ["error"]
          });
          return of(null);
        })
      ).subscribe((res: any) => {
        if(res !== null) {
          const token = res.token
          const user = res.data as User

          this._snackBar.open(`Hello, ${user.username}`, 'OK', {
            duration: this.duration * 1000,
            panelClass: ["success"]
          });

          this.authService.makeUserLoggedIn(token, user)
        }
      })
    }
  }

  get loginForm(): any {
    return this._loginForm;
  }
}
