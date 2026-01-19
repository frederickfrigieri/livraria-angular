import { Component, inject } from '@angular/core';
import { AssuntoService } from '../../services/assunto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-assuntos',
  imports: [ReactiveFormsModule],
  providers: [AssuntoService],
  templateUrl: './assuntos.component.html',
  styleUrl: './assuntos.component.css',
})
export class AssuntosComponent {
  private assuntoService = inject(AssuntoService);
  private fb = inject(FormBuilder);

  public items: any[] = [];
  public assuntoForm: FormGroup;
  public cadastrando = false;

  constructor() {
    this.assuntoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.carregar();
  }

  private carregar(): void {
    this.assuntoService.obterTodos().subscribe((data: any[]) => {
      this.items = data;
    });
  }

  public salvar(): void {
    this.assuntoForm.markAllAsTouched();
    this.assuntoForm.markAllAsDirty();

    if (this.assuntoForm.valid) {
      this.cadastrando = true;
      this.assuntoService.cadastrar(this.assuntoForm.get('descricao')?.value)
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
