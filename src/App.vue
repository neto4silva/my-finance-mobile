<template>
  <v-app theme="dark">
    <router-view />
    <v-bottom-navigation grow color="deep-purple">
      <v-btn value="recent">
        <v-icon>mdi-history</v-icon>

        <span>Transações</span>
      </v-btn>

      <v-btn value="favorites">
        <v-icon>mdi-wallet</v-icon>

        <span>Contas</span>
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-map-marker</v-icon>

        <span>Configurações</span>
      </v-btn>
    </v-bottom-navigation>    
  </v-app>
</template>

<script setup>
//
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

body {
  font-family: "Rubik", sans-serif;
}

::-webkit-scrollbar {
  width: 5px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-card.theme--dark {
  background-color: #312d4b; /* Cor de fundo para os cards no tema dark */
}
</style>
