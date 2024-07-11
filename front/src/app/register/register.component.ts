import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, EMPTY, map} from "rxjs";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    UserService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  private readonly duration: number = 5


  constructor(
    @Inject(UserService) private userService: UserService,
    private snackBar: MatSnackBar
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

      this.userService.registerUser(userReq).pipe(
        map((res) => res),
        catchError((err: any) => {
          this.snackBar.open(err.error.message ?? "Unknown error", "OK", {
            duration: this.duration * 1000,
            panelClass: ['error']
          });
          //return empty to prevent subscribe to fire.
          return EMPTY;
        })
      ).subscribe((data: any) => {
        this.snackBar.open(data.message, "OK", {
          duration: this.duration * 1000,
          panelClass: ['success']
        });
      });
    }
  }

  get registerForm(): any { return this._registerForm; }
}
