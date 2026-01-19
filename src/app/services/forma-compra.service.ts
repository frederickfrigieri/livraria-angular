import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export class FormaCompraService {
    private url = 'https://localhost:7034/api';
    private http = inject(HttpClient);

    public obterTodos(): Observable<any[]> {
        return this.http.get<any[]>(this.url + '/formascompras');
    }
}