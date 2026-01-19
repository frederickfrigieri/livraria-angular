import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";

export class AutorService {
    private http = inject(HttpClient);

    private url = 'https://localhost:7034/api';

    public obterTodos(): Observable<any[]> {
        const endpoint = this.url + '/autores';
        return this.http.get<any[]>(endpoint)
    }

    public cadastrar(nome: string): Observable<void> {
        const endpoint = this.url + '/autores';
        return this.http.post<void>(endpoint, { nome });
    }
}