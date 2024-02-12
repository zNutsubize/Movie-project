import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { NavService } from 'src/app/shared/service/nav.service';
import { Cast } from '../../../shared/interface/cast-interface';
import { SingleMovie } from 'src/app/shared/interface/singleMovie-interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  id: string;
  works: boolean = true;
  data: SingleMovie;
  cast: Cast[];

  constructor(
    private route: ActivatedRoute,
    private http: ApiService,
    private router: Router,
    private search: NavService
  ) {}

  ngOnInit(): void {
    this.search.mustOpen$.next(false);
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.getMovie(this.id);
      this.getCast(this.id);
    });
  }

  getMovie(id: string): void {
    this.http.getMovie(id).subscribe(
      (res: any) => {
        this.data = res;
        console.log('data', this.data);
      },
      (error) => {
        if (error.status == 404) {
          this.works = false;
          this.router.navigate(['/**']);
        } else {
          this.works = false;
          alert('Opss.. Something went wrong!');
        }
      }
    );
  }

  getCast(id: string): void {
    this.http.getCast(this.id).subscribe((res) => {
      this.cast = res;
      console.log('cast:', this.cast);
    });
  }
}
