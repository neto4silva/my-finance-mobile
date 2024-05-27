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
          <v-col>
            <v-card>
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#FF3EA5"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-cart-outline</v-icon>
                </v-avatar>
                <h2 class="ml-3">{{ compras.length }}</h2>
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
                      :items="compras"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                      items-per-page="99999"
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
          <v-col>
            <v-card>
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#4CAF50"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-currency-brl</v-icon>
                </v-avatar>
                <h2 class="ml-3">{{ formatarParaReal(totalGanhos) }}</h2>
              </v-card-title>
              <v-card-text> Ganhos do mês </v-card-text>
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
          <v-col>
            <v-card>
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#FCDC2A"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-wallet-outline</v-icon>
                </v-avatar>
                <h2 class="ml-3">{{ formatarParaReal(totalGastos) }}</h2>
                <v-spacer />
              </v-card-title>
              <v-card-text> Gastos fixos do mês </v-card-text>
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

                  <v-card>
                    <v-data-table
                      :headers="colunasTabelas"
                      :items="gastos"
                      item-key="id"
                      hide-default-header
                      hide-default-footer
                      items-per-page="99999"
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

        <v-row>
          <v-col>
            <v-card>
              <v-card-title class="d-flex align-center">
                <v-avatar
                  color="#2196F3"
                  class="avatar--rounded"
                  tile
                  variant="tonal"
                >
                  <v-icon>mdi-bank</v-icon>
                </v-avatar>
                <span class="ml-3">{{
                  formatarParaReal(totalGanhosMenosGastos)
                }}</span>
              </v-card-title>
              <v-card-text>
                <h2>Total do mês</h2>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="modalAdicionarGanho" persistent max-width="600px">
        <v-card>
          <v-card-title>Adicionar Ganhos</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="novoGanho.data_ganho"
              placeholder="Data do Gasto"
              type="date"
              density="compact"
              variant="solo-filled"
            ></v-text-field>
            <v-text-field
              v-model="novoGanho.valor"
              placeholder="Valor"
              type="number"
              density="compact"
              variant="solo-filled"
              hide-spin-buttons
            ></v-text-field>
            <v-textarea
              v-model="novoGanho.descricao"
              placeholder="Descrição"
              density="compact"
              variant="solo-filled"
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
        <v-card>
          <v-card-title>Adicionar Compra</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="novaCompra.data_compra"
              placeholder="Data da compra"
              type="date"
              density="compact"
              variant="solo-filled"
            ></v-text-field>
            <v-text-field
              v-model="novaCompra.valor"
              placeholder="Valor"
              type="number"
              density="compact"
              variant="solo-filled"
              hide-spin-buttons
            ></v-text-field>
            <v-text-field
              v-model="novaCompra.parcelas"
              placeholder="Parcelas"
              type="number"
              density="compact"
              variant="solo-filled"
              hide-spin-buttons
            ></v-text-field>
            <v-textarea
              v-model="novaCompra.descricao"
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
      compras: [],
      gastos: [],
      ganhos: [],
      expandirCompras: false,
      expandirGastos: false,
      expandirGanhos: false,
      modalAdicionarGanho: false,
      modalAdicionarCompra: false,
      novoGanho: {
        data_ganho: undefined,
        valor: undefined,
        descricao: "",
        pago: false,
      },
      novaCompra: {
        data_compra: undefined,
        valor: undefined,
        descricao: "",
        parcelas: undefined,
      },
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
  },

  methods: {
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
      try {
        const response = await axios.get(
          "https://my-finance-neto.azurewebsites.net/api/v1/compras"
        );
        this.compras = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async adicionarCompra() {
      try {
        const dataCompraISO = new Date(
          this.novaCompra.data_compra
        ).toISOString();
        const response = await axios.post(
          "https://my-finance-neto.azurewebsites.net/api/v1/compras",
          {
            data_compra: dataCompraISO,
            valor: this.novaCompra.valor,
            descricao: this.novaCompra.descricao,
            parcelas: this.novaCompra.parcelas,
          }
        );
        this.modalAdicionarCompra = false;
        this.novaCompra = {
          data_compra: undefined,
          valor: undefined,
          descricao: "",
          parcelas: undefined,
        };
        await this.obterListaCompras();
        this.alertaSucesso = true;
      } catch (error) {
        console.error("Erro ao adicionar compra:", error);
        this.modalAdicionarCompra = false;
        this.mensagemErro = error.response
          ? error.response.data
          : "Erro ao adicionar compra";
        this.alertaErro = true;
      }
    },

    async obterListaGastos() {
      try {
        const response = await axios.get("https://my-finance-neto.azurewebsites.net/api/v1/gastos");
        this.gastos = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async obterListaGanhos() {
      try {
        const response = await axios.get("https://my-finance-neto.azurewebsites.net/api/v1/ganhos");
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

.avatar--rounded {
  border-radius: 6px !important;
}
</style>
