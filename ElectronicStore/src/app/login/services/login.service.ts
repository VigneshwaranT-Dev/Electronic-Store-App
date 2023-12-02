import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private esApiUrl = environment.electronicStoreApi;

  constructor(
    private http: HttpClient
  ) { }

  loginUser(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(`${this.esApiUrl}/api/login`, payload, {headers}).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
