import { Routes } from '@angular/router';
import { LivrosComponent } from './pages/livros/livros.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';
import { Relatorios } from './pages/relatorios/relatorios';

export const routes: Routes = [
    { path: 'livros', component: LivrosComponent },
    { path: 'autores', component: AutoresComponent },
    { path: 'assuntos', component: AssuntosComponent },
    { path: 'relatorios', component: Relatorios },
    { path: '', redirectTo: '/livros', pathMatch: 'full' }
];
