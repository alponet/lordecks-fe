import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }


  getArchetypes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/matches/archetypes`);
  }


  getArchetypeStats(archetype: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/trends/${archetype}`);
  }


  getPlayedDecks(archetype: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/matches/playedDecks/${archetype}`);
  }


  postCardError(cardCode: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/decks/cardError`, { cardCode: cardCode });
  }

}
