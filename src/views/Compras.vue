<template>
  <v-container>
    <v-row>
      <v-col class="pl-6 pt-6 pb-6">
        <v-btn icon color="#28243d" flat :to="'/'">
          <v-icon> mdi-chevron-left </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
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
<style scoped></style>
