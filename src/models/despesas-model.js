export default class DespesasModel {
    constructor(obj) {
      obj = obj || {};
      this.id = obj.id;
      this.data_gasto = obj.data_gasto;
      this.valor = obj.valor;
      this.descricao = obj.descricao;
      this.pago = obj.pago;
    }
  
    modeloValidoParaCadastro() {
      return !!this.data_gasto;
    }
  
    modeloValidoParaAtualizar() {
      return !!this.data_gasto && this.id;
    }
  }