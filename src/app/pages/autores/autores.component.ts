import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autores',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AutorService],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css',
  standalone: true,
})
export class AutoresComponent implements OnInit {

  private autorService = inject(AutorService);
  private fb = inject(FormBuilder);

  public items: any[] = [];
  public autorForm: FormGroup;
  public cadastrando = false;

  constructor() {
    this.autorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.autorService.obterTodos().subscribe((data: any[]) => {
      console.log(data);
      this.items = data;
    });
  }

  public salvarAutor(): void {
    this.autorForm.markAllAsTouched();
    this.autorForm.markAllAsDirty();

    if (this.autorForm.valid) {
      this.cadastrando = true;
      this.autorService.cadastrar(this.autorForm.get('nome')?.value)
        .subscribe(() => {
          this.cadastrando = false;
          this.carregar();
          document.getElementById('btn-fechar-modal')?.click();
        });
    }
  }

  public editar(autor: any): void { }

  public excluir(autor: any): void { }
}
