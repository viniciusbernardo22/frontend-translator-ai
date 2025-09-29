import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { GetTranslation } from '../models/GetTranslation';
import { GetLanguages } from '../models/GetLanguages';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  url = environment.apiUrl + '/translator';

  currentResponse = new BehaviorSubject<string>('');
  constructor(private readonly http: HttpClient) {}

  getTranslation({ phrase, language }: GetTranslation): Observable<string> {
    const structuredPhase = encodeURIComponent(phrase);

    return this.http
      .get(`${this.url}/${structuredPhase}/${language}`, {
        responseType: 'text',
      })
      .pipe(tap((res) => this.currentResponse.next(res)));
  }

  getLanguages(): Observable<GetLanguages[]> {
    return this.http.get<GetLanguages[]>(`${this.url}/get-languages`);
  }

  currentResponseAsObservable(): Observable<string> {
    return this.currentResponse.asObservable();
  }

  translateJson(jsonObject: string, lang: string): Observable<string> {
    throw new Error('Method not implemented.');
  }
}
