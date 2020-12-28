import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegistry } from './../../interfaces/registry';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistriesService {
  registriesEndPoint = 'http://localhost:4000/registries';
  private authHeaderOptions = {
    headers: {
      'auth-token': localStorage.getItem('auth_token') as string
    }
  }
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$ () {
    return this._refresh$;
  }

  getRegistries() {
    return this.http.get(this.registriesEndPoint, this.authHeaderOptions);
  }
  postRegistry(registry: IRegistry) {
    return this.http.post(this.registriesEndPoint, registry, this.authHeaderOptions).
      pipe((
        tap(() => {
          this._refresh$.next();
        })
      ))
  }
  putRegistry(registry: IRegistry) {
    const putEndpoint = `${this.registriesEndPoint}/registry/${registry.id}`;
    return this.http.put(putEndpoint, registry, this.authHeaderOptions).
      pipe((
        tap(() => {
          this._refresh$.next();
        })
      ));
  }
  deleteRegistry(registry: IRegistry) {
    return this.http.delete(this.registriesEndPoint + '/' + 'registry' + '/' + registry.id, this.authHeaderOptions)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      )
  }
}
