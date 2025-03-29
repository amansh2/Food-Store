import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  constructor(private userService: UserService){
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser
  })
}
}
