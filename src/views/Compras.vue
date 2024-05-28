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
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(item, index) in listaDeCompras"
          :key="index"
        >
          <v-card
            :class="[
              'dark-card',
              { 'last-card': index === listaDeCompras.length - 1 },
            ]"
          >
            <v-card-title>{{ item.descricao }}</v-card-title>
            <v-card-subtitle
              >Valor: {{ formatarParaReal(item.valor) }}</v-card-subtitle
            >
            <v-card-subtitle>
              Parcelas:
              <v-chip
                small
                :color="item.parcelas === 1 ? 'green' : 'red'"
                label
              >
                {{ item.parcelas === 1 ? "À vista" : "Parcelado" }}
              </v-chip>
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import comprasService from "@/services/compras-services.js";
import ComprasModel from "@/models/compras-model.js";
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
      listaDeCompras: [],
      compra: new ComprasModel(),
    };
  },

  mounted() {
    this.obterListaCompras();
  },

  methods: {
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
</style>
