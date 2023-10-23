export type TRetornoObjetoResponse = {
  status?:
  | 'Sucesso'
  | 'Erro'
  | 'Não localizado'
  | 'Não autorizado'
  | 'Acesso proibido'
  | 'Registro duplicado'
  | 'Requisição inválida'
  | 'Schema não encontrado'
  | 'Erro de servidor';
  codigo_status?: 200 | 2 | 204 | 4 | 5 | 6 | 7 | 8 | 500;
  titulo?: 'mensagens' | 'dados';
  conteudo: object;
};
