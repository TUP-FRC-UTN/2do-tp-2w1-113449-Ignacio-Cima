import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Observable } from "rxjs";
import { marcadorEstado } from "../interfaces/marcadorEstado";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MarcadorProvider{
    constructor(private http: HttpClient){
    }

    //LLamada a la API para obtener el listado de coordenadas
    getMarcador(): Observable<marcadorEstado>{
        const url = environment.url + "api/geolocalizacion/GetMarcadores";
        return this.http.get<marcadorEstado>(url).pipe(catchError(this.handleError));;
    }

    //Manejo de errores
    private handleError(error: HttpErrorResponse)
    {
        if(error.status === 0){
            console.log("Error... " + error.message);
        }
        else{
            console.log("Status code: " + error.status)
        }
        return throwError(() => new Error(error.error));

    }
}