import api from "./api";

function obterTodas() {
  return api.get("/api/v1/ganhos");
}

function obterPorMes(mes) {
  return api.get(`/api/v1/ganhos/${mes}`);
}

function cadastrar(ganho) {
  return api.post("/api/v1/ganhos", ganho);
}

function atualizar(ganho) {
  return api.put(`/api/v1/ganhos/${ganho.id}`, ganho);
}

function deletar(id) {
  return api.delete(`/api/v1/ganhos/${id}`);
}

export default {
  obterTodas,
  obterPorMes,
  cadastrar,
  atualizar,
  deletar,
};