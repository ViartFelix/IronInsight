import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import AuthService from "../../../services/auth.service";
import { User } from '../../../models/User';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {mustMatch} from "../../../validators/mustMatch";
import {NgForOf, NgIf} from "@angular/common";
import {optionalNumber} from "../../../validators/optionalNumber";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, map, of} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-profile-change-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogContainer,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgForOf,
    MatIcon,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './profile-change-dialog.component.html',
  styleUrl: './profile-change-dialog.component.scss'
})
export class ProfileChangeDialogComponent {
  private _change_profile !: FormGroup
  private readonly userData: User;
  private readonly dialogRef = inject(MatDialogRef<ProfileChangeDialogComponent>)

  private _isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userData = this.authService.user.value
  }

  ngOnInit(): void
  {
    this._change_profile = new FormGroup({
      username: new FormControl(this.userData.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(this.userData.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      weight: new FormControl(
        (this.userData.weight < 0 ? '' : this.userData.weight),
        [
          optionalNumber(),
        ]
      ),
      height: new FormControl(
        (this.userData.height < 0 ? '' : this.userData.height),
        [
          optionalNumber(),
        ]
      ),
    }, mustMatch('password', 'passwordConfirm'))
  }

  onSubmit(): void
  {
    if(!this._change_profile.valid) return;
    const data = this._change_profile.value

    const request = {
      id_user: this.authService.user.value.id_user,
      username: data.username,
      email: data.email,
      password: data.password,
      weight: (data.weight > 0 ? data.weight : -1),
      height: (data.height > 0 ? data.height : -1)
    } as User

    this._isLoading = true;

    this.userService.changeUserData(request).pipe(
      //first function to stop loading in any case
      (res) => {
        this._isLoading = false;
        //and we return the response
        return res
      },
      map((res) => res),
      catchError((err: any) => {
        this.snackBar.open(err.error.message ?? "Unknown error", "OK", {
          duration: 5000,
          panelClass: ['error']
        });
        //return empty to prevent subscribe to fire.
        return EMPTY;
      })
    ).subscribe((data: any) => {
      this.snackBar.open(data?.message ?? "Action accepted.", "OK", {
        duration: 5000,
        panelClass: ['success']
      });
      //updating the jwt token with the new user's infos
      this.authService.makeUserLoggedIn(data.token, data.user)
      this.dialogRef.close();
    })
  }

  get change_profile(): FormGroup { return this._change_profile; }
  get isLoading(): boolean { return this._isLoading; }

}
