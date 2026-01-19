import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { end } from "@popperjs/core";
import { Observable } from "rxjs";

export class LivroService {
    private url = 'https://localhost:7034/api';
    private http = inject(HttpClient);

    public obterTodos(): Observable<any[]> {
        return this.http.get<any[]>(this.url + '/livros');
    }

    public obterRelatorio(): Observable<any[]> {
        return this.http.get<any[]>(this.url + '/livros/relatorio');
    }

    public cadastrar(model: any): Observable<void> {
        console.log(model);
        return this.http.post<void>(this.url + '/livros', model);
    }

    public apagar(codigo: number): Observable<void> {
        const endpoint = this.url + '/livros/' + codigo;
        return this.http.delete<void>(endpoint);
    }
}