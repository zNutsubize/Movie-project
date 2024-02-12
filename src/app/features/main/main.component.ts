import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { NavService } from 'src/app/shared/service/nav.service';
import { ApiService } from '../../shared/service/api.service';
import { Movie } from 'src/app/shared/interface/movie-interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  movies: Movie[];
  images: string[] = [];
  autoSlide: boolean = true;
  interval = 3000;
  selectedIndex: number = 0;
  indicators: boolean = true;
  num: number = 1;

  constructor(
    private http: ApiService,
    private router: Router,
    private nav: NavService,
    private login: LoginAuthService
  ) {}

  Math = Math;
  ngOnInit(): void {
    console.log(this.login.isLoggedIn());
    this.nav.mustOpen$.next(false);
    this.http.getMovies().subscribe((res) => {
      console.log(res);
      this.movies = res;
      this.movies.map((res: any) => {
        this.images.push(res.backdrop_path);
      });
    });
    if (this.autoSlide) {
      this.nextImage();
    }
  }

  onClick(): void {
    let selectedMovie = this.movies.find(
      (res: any) => res.backdrop_path === this.images[this.selectedIndex]
    );
    this.router.navigate(['/movie/' + selectedMovie?.id]);
  }

  nextImage(): void {
    setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }

  selectedImage(index: number): void {
    this.selectedIndex = index;
  }
  nextSlide(): void {
    if (this.selectedIndex == this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  ngOnDestroy(): void {
    this.autoSlide = false;
  }
}
