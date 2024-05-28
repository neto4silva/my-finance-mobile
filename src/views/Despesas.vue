<template>
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
      :items="listaDeDespesas"
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
            <v-chip small label :color="item.pago === true ? 'green' : 'red'">
              <span v-if="item.pago === true">Pago</span>
              <span v-if="item.pago === false">Aberto</span>
            </v-chip>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-row>
</template>

<script>
import despesaService from "@/services/despesas-services.js";
import despesasModel from "@/models/despesas-model.js";
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
<style scoped></style>
