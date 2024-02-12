import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interface/user-interface';
import { Movie } from '../interface/movie-interface';
import { Cast } from '../interface/cast-interface';
import { SingleMovie } from '../interface/singleMovie-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'https://api.themoviedb.org/3/';
  apiKey: string = 'e340f66524306d7a08361463e378a358';
  movieName: string;
  mustOpen: boolean = false;
  userUrl: string =
    'https://api.themoviedb.org/3/trending/all/week?api_key=e340f66524306d7a08361463e378a358';

  public user: User = {
    email: '',
    password: '',
    id: 0,
  };

  usersUrl: string = 'http://localhost:3000/users';

  movieNameSet(name: string) {
    this.movieName = name;
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.userUrl).pipe(
      map((res: any) => {
        return res.results;
      })
    );
  }
  getMovie(id: string): Observable<SingleMovie> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e340f66524306d7a08361463e378a358`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e340f66524306d7a08361463e378a358`
      )
      .pipe(
        map((res: any) => {
          return res.cast;
        })
      );
  }
  searchMovie() {
    return this.http
      .get(
        `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${this.movieName}&page=1&include_adult=false`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postUsers(data: User): Observable<User[]> {
    return this.http.post(this.usersUrl, data) as Observable<User[]>;
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl) as Observable<User[]>;
  }
}
