import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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

  private readonly duration: number = 100


  constructor(
    @Inject(UserService) private userService: UserService,
    private _snackBar: MatSnackBar
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
        const snackClass = data.status ? 'success' : 'error';

        this._snackBar.open(data.message, "OK", {
          duration: this.duration * 1000,
          panelClass: [snackClass]
        });
      });
    }
  }

  get registerForm(): any { return this._registerForm; }
}
