import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livros.service';
import { LivroListagem } from '../../models/livro.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutorService } from '../../services/autor.service';
import { AssuntoService } from '../../services/assunto.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormaCompraService } from '../../services/forma-compra.service';

@Component({
  selector: 'app-livros',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, NgbToastModule],
  providers: [LivroService, AutorService, AssuntoService, FormaCompraService],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css',
})
export class LivrosComponent implements OnInit {

  private livroService = inject(LivroService);
  private autorService = inject(AutorService);
  private assuntoService = inject(AssuntoService);
  private formaCompraService = inject(FormaCompraService);

  private fb = inject(FormBuilder);

  public livroForm: FormGroup;
  public cadastrando = false;

  public livros: LivroListagem[] = [];
  public carregando = false;

  public autores: any[] = [];
  public assuntos: any[] = [];
  public formasCompras: { codigo: number, descricao: string }[] = [];

  public showMessage = false;
  public message = "";
  public success = false;
  public error = false;


  constructor() {
    this.livroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      editora: ['', [Validators.required, Validators.minLength(3)]],
      edicao: ['', [Validators.required]],
      anoPublicacao: ['', [Validators.required]],
      assuntosCodigo: [[], [Validators.required]],
      autoresCodigo: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.carregar();
    this.autorService.obterTodos().subscribe(items => this.autores = items);
    this.assuntoService.obterTodos().subscribe(items => this.assuntos = items);
    this.formaCompraService.obterTodos().subscribe(items => this.formasCompras = items);
  }

  private carregar(): void {
    this.carregando = true;
    this.livroService.obterTodos().subscribe(items => {
      this.livros = items;
      this.carregando = false;
    });
  }

  public getAssuntos(data: any[]): string {
    return data.map(x => x.descricao).join(', ');
  }

  public getAutores(data: any[]): string {
    return data.map(x => x.nome).join(', ');
  }

  public salvar(): void {
    this.livroForm.markAllAsTouched();
    this.livroForm.markAllAsDirty();

    if (this.livroForm.valid) {
      this.cadastrando = true;
      this.livroService.cadastrar(this.livroForm.value).subscribe({
        next: () => {
          this.carregar();
          document.getElementById('btn-fechar-modal')?.click();
          this.cadastrando = false;
          this.showMessage = true;
          this.message = "Livro cadastrado com sucesso!";
          this.success = true;
        },
        error: (error) => {
          document.getElementById('btn-fechar-modal')?.click();
          this.showMessage = true;
          this.cadastrando = false;
          this.error = true;
          this.message = "Não foi possível cadastrar o livro!";
        },
      })
    }
  }

  public editar(livro: any): void { }

  public excluir(livro: any): void {
    this.livroService.apagar(livro.codigo).subscribe(() => this.carregar());
  }
}
