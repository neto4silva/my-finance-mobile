<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn icon color="#28243d" flat :to="'/'">
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-0">
        <v-card class="cartao-informacoes">
          <v-row>
            <v-col cols="6">
              <v-card flat>
                <v-row class="pt-5">
                  <v-avatar class="avatar-receitas">
                    <v-icon>mdi-lock-outline</v-icon>
                  </v-avatar>
                  <v-card-text class="receitas-text"
                    >Total pendente</v-card-text
                  >
                </v-row>
                <v-card-title class="pl-5 pt-0 valor-receitas">
                  <span style="color: #f44336; font-size: 16px">{{
                    formatarParaReal(totalPendente)
                  }}</span>
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat>
                <v-row class="pt-5">
                  <v-avatar class="avatar-receitas">
                    <v-icon>mdi-wallet-outline</v-icon>
                  </v-avatar>
                  <v-card-text class="receitas-text">Total Pago</v-card-text>
                </v-row>
                <v-card-title class="pl-5 pt-0 valor-receitas">
                  <span style="color: #f44336; font-size: 16px">{{
                    formatarParaReal(totalPago)
                  }}</span>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-divider />
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(item, index) in listaDeDespesas"
            :key="index"
          >
            <v-card
              flat
              :class="[{ 'last-card': index === listaDeDespesas.length - 1 }]"
            >
              <v-card-title>
                <v-row>
                  <v-col>
                    {{ item.descricao }}
                  </v-col>
                  <v-col cols="4">
                    <v-row>
                      <v-col class="pb-0" align="end">
                        <span style="color: #f44336; font-size: 16px">{{
                          formatarParaReal(item.valor)
                        }}</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="pt-0 avatar-card" align="end">
                        <v-avatar size="20" :color="item.pago === true ? 'green' : 'red'">
                          <v-icon v-if="item.pago === true" size="x-small">mdi-check</v-icon>
                          <v-icon v-if="item.pago === false" size="x-small">mdi-close</v-icon>
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle class="pb-5 categoria-card">
                 {{ item.categoria }} | Carteira
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import despesaService from "@/services/despesas-services.js";
import despesasModel from "@/models/despesas-model.js";
import moment from "moment";

export default {
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
      listaDeDespesas: [],
      compra: new despesasModel(),
    };
  },

  computed: {
    totalPago() {
      return this.listaDeDespesas
        .filter((gasto) => gasto.pago)
        .reduce((total, gasto) => total + gasto.valor, 0);
    },
    totalPendente() {
      return this.listaDeDespesas
        .filter((gasto) => !gasto.pago)
        .reduce((total, gasto) => total + gasto.valor, 0);
    },
  },

  mounted() {
    this.obterListaCompras();
  },

  methods: {
    async obterListaCompras() {
      despesaService
        .obterTodas()
        .then((response) => {
          this.listaDeDespesas = response.data.map((c) => new despesasModel(c));
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

    async adicionarCompra() {
      if (this.validarCompra(this.compra)) {
        this.compra.data_compra = moment(
          this.compra.data_compra,
          "YYYY-MM-DD"
        ).toISOString();
        comprasService
          .cadastrar(this.compra)
          .then(() => {
            this.compra = new despesasModel();
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

    formatarParaReal(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
};
</script>
<style scoped>
.last-card {
  margin-bottom: 60px;
}

.categoria-card {
  margin-top: -30px;
}

.avatar-card {
  margin-top: -10px;
}

.cartao-informacoes {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
}
</style>
