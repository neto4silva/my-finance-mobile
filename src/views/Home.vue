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
                      color="#00bcd4"
                      variant="outlined"
                      v-bind="props"
                    >
                      {{ mesCorrente }}
                      <v-divider class="border-opacity-100 pl-2" vertical></v-divider>
                      <v-icon class="pl-3">mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(month, index) in meses"
                      :key="index"
                      :value="month"
                      @click="selectMonth(month)"
                    >
                      <v-list-item-title color="#7a5af5">{{ month }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-card-title>
              <v-card-text align="center">
                <span>Saldo total</span>
                <h1>{{ formatarParaReal(totalGanhosMenosGastos) }}</h1>
              </v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-card class="dark-card" flat :to="'/receitas'">
                    <v-row class="pt-5">
                      <v-avatar color="green" class="avatar-receitas">
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-avatar>
                      <v-card-text class="receitas-text">Receitas</v-card-text>
                    </v-row>
                    <v-card-title class="pl-5 pt-0 valor-receitas">
                      <span style="color: #4caf50; font-size: 16px;">{{
                        formatarParaReal(totalGanhos)
                      }}</span>
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card class="dark-card" flat :to="'/despesas'">
                    <v-row class="pt-5">
                      <v-avatar color="red" class="avatar-receitas">
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-avatar>
                      <v-card-text class="receitas-text">Despesas</v-card-text>
                    </v-row>
                    <v-card-title class="pl-5 pt-0 valor-receitas">
                      <span style="color: #f44336; font-size: 16px;">{{
                        formatarParaReal(totalGastos)
                      }}</span>
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pl-0 pr-0">
            <v-card class="borda-10-cards dark-card" :to="'/compras'">
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
              <v-card-text class="coluna-grafico-compras">
                <div>
                  <apexchart
                    type="area"
                    :options="chartOptions"
                    :series="chartSeries"
                  ></apexchart>
                </div>
              </v-card-text>
              <v-card-title class="pb-5" align="center"
                >Compras do mês</v-card-title
              >
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
import VueApexCharts from "vue3-apexcharts";
import comprasService from "@/services/compras-services.js";
import ComprasModel from "@/models/compras-model.js";

export default {
  name: "ViewHome",

  components: {
    apexchart: VueApexCharts,
  },

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
      chartOptions: {
        chart: {
          height: 250,
          type: "area",
          toolbar: {
            show: false,
          },
        },

        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        colors: ["#FF3EA5"],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100],
            colorStops: [
              {
                offset: 0,
                color: "#FF3EA5",
              },
              {
                offset: 100,
                color: "rgb(49, 45, 75)",
              },
            ],
          },
        },
        grid: {
          show: false,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
      },
      chartSeries: [
        {
          name: "Valor",
          data: [],
        },
      ],

      mesCorrente: "",
      listaDeCompras: [],
      gastos: [],
      ganhos: [],
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
        const response = await comprasService.obterTodas();
        this.listaDeCompras = response.data.map((c) => new ComprasModel(c));

        const comprasPorDia = {};

        this.listaDeCompras.forEach((compra) => {
          const dataCompra = compra.data_compra.split("T")[0];
          if (comprasPorDia[dataCompra]) {
            comprasPorDia[dataCompra]++;
          } else {
            comprasPorDia[dataCompra] = 1;
          }
        });

        const dadosGrafico = Object.keys(comprasPorDia).map((data) => ({
          x: data,
          y: comprasPorDia[data],
        }));
        dadosGrafico.sort((a, b) => new Date(a.x) - new Date(b.x));

        this.chartSeries[0].data = dadosGrafico;

        if (this.$refs.chart) {
          const chart = new VueApexCharts(this.$refs.chart, this.chartOptions);
          chart.render();
        }
      } catch (error) {
        console.log(error);
        this.$swal.fire(
          "Erro",
          "Ocorreu um erro ao obter as compras",
          "error"
        );
      }
    },

    validarCompra(compra) {
      return (
        compra.data_compra &&
        compra.valor &&
        compra.descricao &&
        compra.parcelas
      );
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
  background: #2e3637 !important;
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

.coluna-grafico-compras {
  margin-right: -25px;
  margin-left: -27px;
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

svg line {
  stroke: transparent !important;
}

.dark-swal-cancel-button {
  background-color: #777;
}

.dark-swal-footer {
  color: #ccc;
}
</style>
