import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent implements OnInit {
  authPage: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authPage = this.route.snapshot.paramMap.get('authPage') as string;
  }
  getAuthPage() {
    return this.authPage;
  }

}
