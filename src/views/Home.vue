<template>
  <v-app>
    <v-main>
      <v-alert
        v-model="alertaSucesso"
        type="success"
        variant="tonal"
        border="start"
        closable
        prominent
        transition="scale-transition"
      >
        Ganho adicionado com sucesso!
      </v-alert>

      <v-alert
        v-model="alertaErro"
        type="error"
        variant="tonal"
        closable
        prominent
        transition="scale-transition"
      >
        {{ mensagemErro }}
      </v-alert>
      <v-container>
        <v-row>
          <v-col class="pl-0 pr-0">
            <v-card class="card-total-mes dark-card">
              <v-card-title class="d-flex align-center">
                <v-avatar>
                  <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-img>
                </v-avatar>
                <v-spacer />
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="deep-purple"
                      variant="outlined"
                      v-bind="props"
                    >
                      {{ mesCorrente }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(month, index) in meses"
                      :key="index"
                      :value="month"
                      @click="selectMonth(month)"
                    >
                      <v-list-item-title>{{ month }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-spacer />
                <v-avatar />
              </v-card-title>
              <v-card-text align="center">
                <span>Saldo total</span>
                <h1>{{ formatarParaReal(totalGanhosMenosGastos) }}</h1>
              </v-card-text>
              <v-row class="pt-4">
                <v-col>
                  <v-row>
                    <v-avatar color="green" class="avatar-receitas">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-avatar>
                    <v-card-text class="receitas-text">Receitas</v-card-text>
                  </v-row>
                  <v-card-title class="pl-5 pt-0 valor-receitas">
                    <span style="color: #4caf50">{{
                      formatarParaReal(totalGanhos)
                    }}</span>
                  </v-card-title>
                </v-col>
                <v-col>
                  <v-row>
                    <v-avatar color="red" class="avatar-receitas">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-avatar>
                    <v-card-text class="receitas-text">Despesas</v-card-text>
                  </v-row>
                  <v-card-title class="pl-5 pt-0 valor-receitas">
                    <span style="color: #f44336">{{
                      formatarParaReal(totalGastos)
                    }}</span>
                  </v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pl-0 pr-0">
            <v-card class="borda-10-cards dark-card">
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#FF3EA5"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-cart-outline</v-icon>
                </v-avatar>
                <h2 class="ml-3">{{ listaDeCompras.length }}</h2>
              </v-card-title>
              <v-card-text> Compras feitas no mês </v-card-text>
              <v-card-subtitle class="pb-5">
                <strong>18%</strong> maior que o mês anterior
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="#FF3EA5"
                  prepend-icon="mdi-plus"
                  variant="outlined"
                  @click="modalAdicionarCompra = true"
                >
                  Adicionar
                </v-btn>
                <v-spacer />
                <v-btn color="#FF3EA5" @click="expandirCardCompras">
                  Detalhes
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="expandirCompras">
                  <v-divider></v-divider>

                  <v-card>
                    <v-data-table
                      :headers="colunasTabelas"
                      :items="listaDeCompras"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                      items-per-page="99999"
                      class="dark-card"
                    >
                      <template v-slot:item="{ item }">
                        <tr>
                          <td>{{ item.descricao }}</td>
                          <td>{{ formatarParaReal(item.valor) }}</td>
                          <td>
                            <v-chip
                              small
                              label
                              :color="item.parcelas === 1 ? 'green' : 'red'"
                            >
                              <span v-if="item.parcelas === 1">À vista</span>
                              <span v-if="item.parcelas !== 1">Parcelado</span>
                            </v-chip>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pl-0 pr-0">
            <v-card class="borda-10-cards dark-card">
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#4CAF50"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-currency-brl</v-icon>
                </v-avatar>
                <h3 class="ml-3">Receitas do mês</h3>
              </v-card-title>
              <v-card-subtitle class="pb-5">
                <strong>18%</strong> maior que o mês anterior
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="#4CAF50"
                  prepend-icon="mdi-plus"
                  variant="outlined"
                  @click="modalAdicionarGanho = true"
                >
                  Adicionar
                </v-btn>
                <v-spacer />
                <v-btn color="#4CAF50" @click="expandirCardGanhos">
                  Detalhes
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="expandirGanhos">
                  <v-divider></v-divider>

                  <v-card>
                    <v-data-table
                      :headers="colunasTabelas"
                      :items="ganhos"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                      items-per-page="99999"
                      class="dark-card"
                    >
                      <template v-slot:item="{ item }">
                        <tr>
                          <td>{{ item.descricao }}</td>
                          <td>{{ formatarParaReal(item.valor) }}</td>
                          <td>
                            <v-chip
                              small
                              label
                              :color="item.pago === true ? 'green' : 'red'"
                            >
                              <span v-if="item.pago === true">Recebido</span>
                              <span v-if="item.pago === false">Aberto</span>
                            </v-chip>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pl-0 pr-0">
            <v-card class="card-gastos-fixos borda-10-cards dark-card">
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#FCDC2A"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-avatar>
                <h3 class="ml-3">Gastos fixos do mês</h3>
                <v-spacer />
              </v-card-title>
              <v-card-subtitle class="pb-5">
                <strong>18%</strong> maior que o mês anterior
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="#FCDC2A"
                  prepend-icon="mdi-plus"
                  variant="outlined"
                >
                  Adicionar
                </v-btn>
                <v-spacer />
                <v-spacer />
                <v-btn color="#FCDC2A" @click="expandirCardGastos">
                  Detalhes
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="expandirGastos">
                  <v-divider></v-divider>

                  <v-card class="dark-card">
                    <v-data-table
                      :headers="colunasTabelas"
                      :items="gastos"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                      items-per-page="99999"
                      class="dark-card"
                    >
                      <template v-slot:item="{ item }">
                        <tr>
                          <td>{{ item.descricao }}</td>
                          <td>{{ formatarParaReal(item.valor) }}</td>
                          <td>
                            <v-chip
                              small
                              label
                              :color="item.pago === true ? 'green' : 'red'"
                            >
                              <span v-if="item.pago === true">Pago</span>
                              <span v-if="item.pago === false">Aberto</span>
                            </v-chip>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="modalAdicionarGanho" persistent max-width="600px">
        <v-card class="dark-card">
          <v-card-title>Adicionar Receitas</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="novoGanho.data_ganho"
              placeholder="Data do Gasto"
              type="date"
              density="compact"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="novoGanho.valor"
              placeholder="Valor"
              type="number"
              density="compact"
              variant="outlined"
              hide-spin-buttons
            ></v-text-field>
            <v-textarea
              v-model="novoGanho.descricao"
              placeholder="Descrição"
              density="compact"
              variant="outlined"
              no-resize
            ></v-textarea>
            <v-checkbox v-model="novoGanho.pago" label="Pago"></v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click="modalAdicionarGanho = false"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="adicionarGanho"
              >Adicionar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="modalAdicionarCompra" persistent max-width="600px">
        <v-card class="dark-card">
          <v-card-title>Adicionar Compra</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="compra.data_compra"
              placeholder="Data da compra"
              type="date"
              density="compact"
              variant="solo-filled"
            ></v-text-field>
            <v-text-field
              v-model="compra.valor"
              placeholder="Valor"
              type="number"
              density="compact"
              variant="solo-filled"
              hide-spin-buttons
            ></v-text-field>
            <v-text-field
              v-model="compra.parcelas"
              placeholder="Parcelas"
              type="number"
              density="compact"
              variant="solo-filled"
              hide-spin-buttons
            ></v-text-field>
            <v-textarea
              v-model="compra.descricao"
              placeholder="Descrição"
              density="compact"
              variant="solo-filled"
              no-resize
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click="modalAdicionarCompra = false"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="adicionarCompra"
              >Adicionar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import api from "@/services/api.js";
import moment from "moment";
import comprasService from "@/services/compras-services.js";
import ComprasModel from "@/models/compras-model.js";

export default {
  name: "Home",

  data() {
    return {
      colunasTabelas: [
        {
          title: "Compras do mês",
          value: "descricao",
        },
        {
          title: "",
          value: "valor",
        },
        {
          title: "",
          value: "parcelas",
        },
      ],
      meses: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      mesCorrente: "",
      listaDeCompras: [],
      gastos: [],
      ganhos: [],
      expandirCompras: false,
      expandirGastos: false,
      expandirGanhos: false,
      modalAdicionarGanho: false,
      modalAdicionarCompra: false,
      exibirMeses: false,
      novoGanho: {
        data_ganho: undefined,
        valor: undefined,
        descricao: "",
        pago: false,
      },
      compra: new ComprasModel(),
      alertaSucesso: false,
      alertaErro: false,
      mensagemErro: "",
    };
  },

  computed: {
    totalGastos() {
      return this.gastos
        .filter((gasto) => gasto.pago)
        .reduce((total, gasto) => total + gasto.valor, 0);
    },

    totalGanhos() {
      return this.ganhos
        .filter((ganho) => ganho.pago)
        .reduce((total, ganho) => total + ganho.valor, 0);
    },

    totalGanhosMenosGastos() {
      const totalGanhos = this.ganhos
        .filter((ganho) => ganho.pago)
        .reduce((total, ganho) => total + ganho.valor, 0);
      const totalGastos = this.gastos
        .filter((gasto) => gasto.pago)
        .reduce((total, gasto) => total + gasto.valor, 0);
      return totalGanhos - totalGastos;
    },
  },

  mounted() {
    this.obterListaCompras();
    this.obterListaGastos();
    this.obterListaGanhos();

    const mesCorrenteIndex = new Date().getMonth();
    this.mesCorrente = this.meses[mesCorrenteIndex];
  },

  methods: {
    selectMonth(month) {
      console.log("Mês selecionado:", month);
      this.mesCorrente = month;
    },

    expandirCardCompras() {
      this.expandirCompras = !this.expandirCompras;
      this.obterListaCompras();
    },

    expandirCardGastos() {
      this.expandirGastos = !this.expandirGastos;
      this.obterListaGastos();
    },

    expandirCardGanhos() {
      this.expandirGanhos = !this.expandirGanhos;
      this.obterListaGanhos();
    },

    async obterListaCompras() {
      comprasService
        .obterTodas()
        .then((response) => {
          this.listaDeCompras = response.data.map((c) => new ComprasModel(c));
        })
        .catch((error) => {
          console.log(error);
          this.$swal.fire(
            "Erro",
            "Ocorreu um erro ao obter os clientes",
            "error"
          );
        });
    },

    editarCliente() {
      clienteService
        .atualizar(this.compra)
        .then(() => {
          this.compra = new Cliente();
          this.obterTodosOsClientes();
          if (!this.manterAberto) {
            this.modalAberto = false;
          }
          this.$swal.fire({
            position: "center",
            icon: "success",
            title: "Cliente atualizado com sucesso",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((error) => {
          console.error("Erro ao editar o cliente:", error);
          this.$swal.fire(
            "Erro",
            "Ocorreu um erro ao editar o cliente",
            "error"
          );
        });
    },

    validarCompra(compra) {
      return (
        compra.data_compra &&
        compra.valor &&
        compra.descricao &&
        compra.parcelas
      );
    },

    async adicionarCompra() {
      if (this.validarCompra(this.compra)) {
        this.compra.data_compra = moment(
          this.compra.data_compra,
          "YYYY-MM-DD"
        ).toISOString();
        comprasService
          .cadastrar(this.compra)
          .then(() => {
            this.compra = new ComprasModel();
            this.obterListaCompras();
            this.modalAdicionarCompra = false;
            this.$swal.fire({
              position: "center",
              icon: "success",
              title: "Compra cadastrada com sucesso",
              showConfirmButton: false,
              timer: 1000,
              customClass: {
                container: "dark-swal-container",
                popup: "dark-swal-popup",
                header: "dark-swal-header",
                title: "dark-swal-title",
                content: "dark-swal-content",
                confirmButton: "dark-swal-confirm-button",
                cancelButton: "dark-swal-cancel-button",
                actions: "dark-swal-actions",
                footer: "dark-swal-footer",
              },
            });
          })
          .catch((error) => {
            this.modalAdicionarCompra = false;
            console.error("Erro ao adicionar a compra:", error);
            this.$swal.fire({
              position: "center",
              icon: "error",
              title: "Erro ao adicionar a compra",
              showConfirmButton: false,
              timer: 1000,
              customClass: {
                container: "dark-swal-container",
                popup: "dark-swal-popup",
                header: "dark-swal-header",
                title: "dark-swal-title",
                content: "dark-swal-content",
                confirmButton: "dark-swal-confirm-button",
                cancelButton: "dark-swal-cancel-button",
                actions: "dark-swal-actions",
                footer: "dark-swal-footer",
              },
            });
          });
      } else {
        this.$swal.fire(
          "Erro",
          "Por favor, preencha todos os campos obrigatórios",
          "error"
        );
      }
    },

    async obterListaGastos() {
      try {
        const response = await axios.get(
          "https://my-finance-neto.azurewebsites.net/api/v1/gastos"
        );
        this.gastos = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async obterListaGanhos() {
      try {
        const response = await axios.get(
          "https://my-finance-neto.azurewebsites.net/api/v1/ganhos"
        );
        this.ganhos = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async adicionarGanho() {
      try {
        const dataGanhoISO = new Date(this.novoGanho.data_ganho).toISOString();
        const response = await axios.post(
          "https://my-finance-neto.azurewebsites.net/api/v1/ganhos",
          {
            data_ganho: dataGanhoISO,
            valor: this.novoGanho.valor,
            descricao: this.novoGanho.descricao,
            pago: this.novoGanho.pago,
          }
        );
        this.modalAdicionarGanho = false;
        (this.novoGanho = {
          data_ganho: undefined,
          valor: undefined,
          descricao: "",
          pago: false,
        }),
          await this.obterListaGanhos();
        this.alertaSucesso = true;
      } catch (error) {
        console.error("Erro ao adicionar ganho:", error);
        this.modalAdicionarGanho = false;
        this.mensagemErro = error.response
          ? error.response.data
          : "Erro ao adicionar ganho";
        this.alertaErro = true;
      }
    },

    formatarParaReal(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },

    formatarParaDia(data) {
      const options = { day: "numeric" };
      return new Date(data).toLocaleDateString("pt-BR", options);
    },
  },
};
</script>

<style>
.card-gastos-mes {
  border-bottom: 3px solid #8c57ff !important;
}

.card-gastos-fixos {
  margin-bottom: 60px;
}

.dark-card {
  background: #312d4b !important;
}

.card-total-mes {
  margin-top: -15px;
  width: 102%;
  margin-left: -3px;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
}

.receitas-text {
  margin-top: -15px;
  margin-left: -10px;
}

.avatar-receitas {
  margin-left: 25px;
}

.valor-receitas {
  margin-left: 38px;
  margin-top: -25px;
}

.borda-10-cards {
  border-radius: 10px !important;
}

.avatar--rounded {
  border-radius: 6px !important;
}

.dark-swal-container {
  background-color: #333;
}

.dark-swal-popup {
  background-color: #333;
  color: #fff;
}

.dark-swal-header,
.dark-swal-title {
  color: #fff;
}

.dark-swal-content {
  color: #ccc;
}

.dark-swal-confirm-button {
  background-color: #555;
}

.dark-swal-cancel-button {
  background-color: #777;
}

.dark-swal-footer {
  color: #ccc;
}
</style>
