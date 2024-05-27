export default class ComprasModel {
  constructor(obj) {
    obj = obj || {};
    this.id = obj.id;
    this.data_compra = obj.data_compra;
    this.valor = obj.valor;
    this.descricao = obj.descricao;
    this.parcelas = obj.parcelas;
  }

  modeloValidoParaCadastro() {
    return !!this.data_compra;
  }

  modeloValidoParaAtualizar() {
    return !!this.data_compra && this.id;
  }
}