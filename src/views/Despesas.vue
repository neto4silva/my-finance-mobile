<template>
  <v-container>
    <v-row>
      <v-col>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn flat color="#192122" v-bind="props">
              Despesas
              <v-divider class="border-opacity-100 pl-2" vertical></v-divider>
              <v-icon class="pl-3">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(route, index) in routes"
              :key="index"
              :to="route.to"
              link
            >
              <v-list-item-title color="#7a5af5">
                <v-icon :color="route.color" class="pr-2"
                  >mdi-circle-medium</v-icon
                >
                {{ route.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-col align="center">
      <v-btn
        color="red"
        class="botao-adicionar-despesa"
        icon="mdi-plus"
        @click="modalAdicionarDespesa = !modalAdicionarDespesa"
      ></v-btn>
    </v-col>
    <v-row>
      <v-col class="pa-0">
        <v-card class="cartao-informacoes dark-card">
          <v-row>
            <v-col cols="6">
              <v-card flat class="dark-card">
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
              <v-card flat class="dark-card">
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
            class="pa-0"
            v-for="(item, index) in listaDeDespesas"
            :key="index"
          >
            <v-card
              flat
              :class="[
                { 'last-card': index === listaDeDespesas.length - 1 },
                'dark-card',
              ]"
            >
              <v-card-title>
                <v-row>
                  <v-avatar
                    :color="categorias[item.categoria].color"
                    class="avatar-despesas"
                  >
                    <v-icon size="25px">{{
                      categorias[item.categoria].icon
                    }}</v-icon>
                  </v-avatar>
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
                        <v-chip
													v-if="item.pago"
													size="small"
													label
                          color="green"
                        >
                          Pago
													<v-icon class="pl-2">mdi-check</v-icon>
                        </v-chip>
												<v-chip
													v-if="!item.pago"
													size="small"
													label
                          color="red"
                        >
                          Pendente
													<v-icon class="pl-2">mdi-close</v-icon>
                        </v-chip>
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
    <v-dialog
      transition="dialog-top-transition"
      fullscreen
      v-model="modalAdicionarDespesa"
    >
      <v-card>
        <v-card-title>
          <v-icon size="20" class="pt-0 pr-6 pl-2">mdi-arrow-left</v-icon> Nova
          despesa
        </v-card-title>
        <span style="font-size: 12px" class="pl-4 pb-0">Valor da despesa</span>
        <span style="font-size: 30px; font-weight: 600" class="pl-4 pt-0"
          >R$ 0,00</span
        >
        <v-card class="pt-3 card-informacoes" color="#2e3637">
          <v-card flat>
            <v-card
              class="pt-4"
              color="#2e3637"
              link
              @click="despesaPaga = !despesaPaga"
            >
              <v-row class="pr-12 pl-12">
                <v-icon class="pr-8 pt-4"
                  >mdi-checkbox-marked-circle-outline</v-icon
                >
                <span class="pt-2" v-if="despesaPaga"
                  ><strong>Pago</strong></span
                >
                <span class="pt-2" v-if="!despesaPaga"
                  ><strong>Não foi pago</strong></span
                >
                <v-spacer></v-spacer>
                <v-switch
                  v-model="despesaPaga"
                  class="switch-pago"
                  color="red"
                ></v-switch>
              </v-row>
              <v-divider></v-divider>
            </v-card>
          </v-card>
        </v-card>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import despesaService from "@/services/despesas-services.js";
import despesasModel from "@/models/despesas-model.js";
// import moment from "moment";

export default {
  name: "DespesasView",
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
      modalAdicionarDespesa: false,
      despesaPaga: false,
      listaDeDespesas: [],
      categorias: {
        Alimentação: { color: "green", icon: "mdi-food-drumstick-outline" },
        Transporte: { color: "blue", icon: "mdi-bus" },
        Lazer: { color: "purple", icon: "mdi-movie-outline" },
        Saúde: { color: "red", icon: "mdi-heart-pulse" },
        Educação: { color: "orange", icon: "mdi-book-open-outline" },
        Moradia: { color: "grey", icon: "mdi-home-outline" },
        Compras: { color: "pink", icon: "mdi-cart-outline" },
        Serviços: { color: "brown", icon: "mdi-wrench-outline" },
        Segurança: { color: "yellow", icon: "mdi-shield-outline" },
        Tecnologia: { color: "lightblue", icon: "mdi-laptop-outline" },
        Viagem: { color: "teal", icon: "mdi-airplane-outline" },
        Automóvel: { color: "#78A083", icon: "mdi-car-outline" },
        Investimento: { color: "#008170", icon: "mdi-asterisk" },
      },
      routes: [
        {
          title: "Compras",
          to: "/compras",
          color: "#FF3EA5",
        },
        {
          title: "Receitas",
          to: "/receitas",
          color: "green",
        },
        // {
        //   title: "Transações",
        //   to: "/transacoes",
        //   color: "blue"
        // },
      ],
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

    // async adicionarCompra() {
    //   if (this.validarCompra(this.compra)) {
    //     this.compra.data_compra = moment(
    //       this.compra.data_compra,
    //       "YYYY-MM-DD"
    //     ).toISOString();
    //     comprasService
    //       .cadastrar(this.compra)
    //       .then(() => {
    //         this.compra = new despesasModel();
    //         this.obterListaCompras();
    //         this.modalAdicionarCompra = false;
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "success",
    //           title: "Compra cadastrada com sucesso",
    //           showConfirmButton: false,
    //           timer: 1000,
    //           customClass: {
    //             container: "dark-swal-container",
    //             popup: "dark-swal-popup",
    //             header: "dark-swal-header",
    //             title: "dark-swal-title",
    //             content: "dark-swal-content",
    //             confirmButton: "dark-swal-confirm-button",
    //             cancelButton: "dark-swal-cancel-button",
    //             actions: "dark-swal-actions",
    //             footer: "dark-swal-footer",
    //           },
    //         });
    //       })
    //       .catch((error) => {
    //         this.modalAdicionarCompra = false;
    //         console.error("Erro ao adicionar a compra:", error);
    //         this.$swal.fire({
    //           position: "center",
    //           icon: "error",
    //           title: "Erro ao adicionar a compra",
    //           showConfirmButton: false,
    //           timer: 1000,
    //           customClass: {
    //             container: "dark-swal-container",
    //             popup: "dark-swal-popup",
    //             header: "dark-swal-header",
    //             title: "dark-swal-title",
    //             content: "dark-swal-content",
    //             confirmButton: "dark-swal-confirm-button",
    //             cancelButton: "dark-swal-cancel-button",
    //             actions: "dark-swal-actions",
    //             footer: "dark-swal-footer",
    //           },
    //         });
    //       });
    //   } else {
    //     this.$swal.fire(
    //       "Erro",
    //       "Por favor, preencha todos os campos obrigatórios",
    //       "error"
    //     );
    //   }
    // },

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
  margin-bottom: 50px;
}

.card-informacoes {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.avatar-despesas {
  margin-top: 20px;
  margin-left: 10px;
}

.categoria-card {
  margin-top: -30px;
  margin-left: 50px;
}

.botao-adicionar-despesa {
  margin-bottom: -15px;
  z-index: 2;
}

.switch-pago {
  margin-top: -10px;
  margin-bottom: -10px;
}

.avatar-card {
  margin-top: -10px;
}

.cartao-informacoes {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
}
</style>
