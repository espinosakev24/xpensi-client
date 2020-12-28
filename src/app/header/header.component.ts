import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }
  clickLogOut() {
    // console.log(this.authService.currentUser())
    this.authService.logout();
  }
  getUser() {
    return this.authService.currentUser();
  }
}
