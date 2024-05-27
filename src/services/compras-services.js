import api from "./api";

function obterTodas() {
  return api.get("/api/v1/compras");
}

function obterPorMes(mes) {
  return api.get(`/api/v1/compras/${mes}`);
}

function cadastrar(compra) {
  return api.post("/api/v1/compras", compra);
}

function atualizar(compra) {
  return api.put(`/api/v1/compras/${compra.id}`, compra);
}

function deletar(id) {
  return api.delete(`/api/v1/compras/${id}`);
}

export default {
  obterTodas,
  obterPorMes,
  cadastrar,
  atualizar,
  deletar,
};