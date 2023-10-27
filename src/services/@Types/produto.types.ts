export type TProdutoCadastro = {
  descricao: string,
  custo: string,
  imagem: string,
  lojas_preco: Array<TLojaPreco>
}

type TLojaPreco = {
  id_loja: string,
  preco_venda: string
}
