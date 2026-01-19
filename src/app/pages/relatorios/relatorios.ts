import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livros.service';
import { CommonModule } from '@angular/common';
import { RelatorioAutorViewModel } from '../../models/livro.model';

@Component({
  selector: 'app-relatorios',
  imports: [CommonModule],
  providers: [LivroService],
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class Relatorios implements OnInit {

  private service = inject(LivroService);
  public items: RelatorioAutorViewModel[] = [];

  ngOnInit(): void {
    this.service.obterRelatorio().subscribe(resp => this.items = resp);
  }

  public obterQuantidadeLivros(item: RelatorioAutorViewModel): number {
    return item.livros.length;
  }
}
