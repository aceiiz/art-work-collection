import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.css']
})

export class ArtWorkComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url !== '/art-work/art-work-list') {
      this.setRedirectTo();
    }
  }

  setRedirectTo() {
    if (this.router.url === '/art-work') {
      this.router.navigate(['/art-work/art-work-list']);
    }
  }
}
