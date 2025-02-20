import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceModel } from '../models/place.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {
  private urlBBDD = 'http://localhost:3000/sitios'; // JSON-Server

  constructor(private _http: HttpClient) {}

  
  getSites(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(this.urlBBDD);
  }

  
  getSiteById(id: string): Observable<PlaceModel> {
    return this._http.get<PlaceModel>(`${this.urlBBDD}/${id}`);
  }


  getPlacesAdmin(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(this.urlBBDD);
  }


  addPlace(data: PlaceModel): Observable<PlaceModel> {
    console.log("Creando nuevo sitio:", data);
    return this._http.post<PlaceModel>(this.urlBBDD, data); // json-server generará el ID
  }
  

   editPlace(id: string, data: PlaceModel): Observable<PlaceModel> {
    console.log("Editando sitio con ID:", id);
    return this._http.put<PlaceModel>(`${this.urlBBDD}/${id}`, data);
  }

  deletePlace(id: string): Observable<void> {
    console.log("Eliminando sitio con ID:", id);
    return this._http.delete<void>(`${this.urlBBDD}/${id}`);
  }
}
