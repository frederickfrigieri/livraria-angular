export interface LivroListagem {
    codigo: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    autores: [{ nome: string }],
    assuntos: [{ nome: string }]
}


export interface RelatorioAutorViewModel {
    autor: string;
    codigo: number;
    livros: RelatorioLivrosViewModel[];
}

export interface RelatorioLivrosViewModel {
    codigo: number;
    titulo: string;
    anoPublicacao: string;
    editora: string;
    edicao: number;
    assuntos: string;
}
