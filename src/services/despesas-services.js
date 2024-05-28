import api from "./api";

function obterTodas() {
  return api.get("/api/v1/gastos");
}

function obterPorMes(mes) {
  return api.get(`/api/v1/gastos/${mes}`);
}

function cadastrar(gasto) {
  return api.post("/api/v1/gastos", gasto);
}

function atualizar(gasto) {
  return api.put(`/api/v1/gastos/${gasto.id}`, gasto);
}

function deletar(id) {
  return api.delete(`/api/v1/gastos/${id}`);
}

export default {
  obterTodas,
  obterPorMes,
  cadastrar,
  atualizar,
  deletar,
};