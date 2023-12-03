import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private esApiUrl = environment.electronicStoreApi;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  loginUser(payload: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<any>(`${this.esApiUrl}/api/login`, payload, {headers}).pipe(
      map((response: any) => {
        console.log(response);
        if (response.status == 2) {
          return response.data
        } else {
          this.toastrService.error(response.message, 'Login Attempt Failed', { closeButton: true, positionClass: 'toast-top-center',
          timeOut: 3000, progressBar: true});
        }
      })
    )
  }
}
