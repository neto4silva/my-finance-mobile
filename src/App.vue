<template>
  <v-app theme="dark">
  <router-view />
  </v-app>  
</template>

<script setup>
  //
</script>

<style>
::-webkit-scrollbar {
  width: 5px; 
  height: 12px; 
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}

::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 6px; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}


</style>
