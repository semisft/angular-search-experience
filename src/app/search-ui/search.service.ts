import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

export interface Application {
  category: string;
  rating: number;
  name: string;
  image: string;
  link: string;
  ratingCount: number;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  fetchMocks(search: string): Observable<Application[]> {
    return this.http.get(environment.mock.url).pipe(
      map((data: Application[]) => {
        return data.map(d => {
          d.image = 'https://angular.io/assets/images/logos/angular/angular.svg';
          return d;
        });
      }),
      map(apps => apps.filter(app => search.length > 0 && new RegExp(`${search}`, 'ig').test(app.name))),
      map(apps => apps.slice(0, 100))
    );
  }
}
