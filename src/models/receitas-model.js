export default class ReceitasModel {
    constructor(obj) {
      obj = obj || {};
      this.id = obj.id;
      this.data_ganho = obj.data_ganho;
      this.valor = obj.valor;
      this.descricao = obj.descricao;
      this.categoria = obj.categoria;
      this.pago = obj.pago;
    }
  
    modeloValidoParaCadastro() {
      return !!this.data_ganho;
    }
  
    modeloValidoParaAtualizar() {
      return !!this.data_ganho && this.id;
    }
  }