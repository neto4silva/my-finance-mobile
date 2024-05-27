<template>
    <apexchart type="area" height="200" :options="chartOptions" :series="chartData" />
  </template>
  
  <script>
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    name: 'AreaChart',
    components: {
      apexchart: VueApexCharts
    },
    data() {
      return {
        chartData: [
          {
            name: 'Gastos',
            data: [] // Inicialmente vazio, para preencher com os gastos de cada dia
          }
        ],
        chartOptions: {
          chart: {
            id: 'my-chart-id',
            toolbar: {
              show: false
            }
          },
          grid: {
          show: false
        },
          xaxis: {
            categories: [] // Inicialmente vazio, para preencher com os dias do mês
          },
          fill: {
            opacity: 0.5
          },
          responsive: [
            {
              breakpoint: 1000,
              options: {
                chart: {
                  width: '100%'
                },
                legend: {
                  position: 'bottom'
                }
              }
            }
          ]
        }
      }
    },
    mounted() {
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      
      this.chartOptions.xaxis.categories = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      
      const gastosPorDia = [40, 20, 12, 30, 45, 25, 35, 28, 50, 20, 30, 40, 25, 35, 28, 50, 20, 30, 40, 25, 35, 28, 50, 20, 30, 40, 25, 35, 28, 50, 20];
      
      this.chartData[0].data = gastosPorDia;
    }
  }
  </script>
  
  <style>
  /* Adicione qualquer estilo específico, se necessário */
  </style>
  