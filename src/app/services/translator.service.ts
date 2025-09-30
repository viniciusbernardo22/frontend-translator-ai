import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetLanguages } from '../models/GetLanguages';
import { HttpClient } from '@angular/common/http';
import { GetTranslation } from '../models/GetTranslation';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  url = environment.apiUrl + '/translator';

  constructor(private readonly http: HttpClient) {}

  getTranslation(request: GetTranslation): Observable<string> {
    const structuredPhrase = encodeURIComponent(request.phrase);
    return this.http.get(
      `${this.url}/${structuredPhrase}/${request.language}`,
      { responseType: 'text' }
    );
  }

  getLanguages(): Observable<GetLanguages[]> {
    return this.http.get<GetLanguages[]>(`${this.url}/get-languages`);
  }

  translateJson(jsonObject: any, language: string): Observable<string> {
    return this.http.post(
      `${this.url}/translate-json`,
      { jsonObject: jsonObject, language },
      { responseType: 'text' }
    );
  }
}
