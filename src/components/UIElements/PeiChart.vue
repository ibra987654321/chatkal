<template>
  <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6 2xl:block hidden">
    <div className="flex justify-between items-start w-full">
      <div className="flex-col items-center">
        <div className="flex items-center mb-1">
          <h5 className="text-xl font-bold leading-none text-gray-900 me-1">Жалпы 200 кожолук</h5>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom"
                type="button"
                className="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
          <svg className="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
          </svg>
          <span className="sr-only">Open dropdown</span>
        </button>
        <div id="widgetDropdown"
             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
            <li>
              <a href="#"
                 className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 21 21">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                </svg>
                Edit widget
              </a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 20 20">
                  <path
                      d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                  <path
                      d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                </svg>
                Download data
              </a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 18 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
                </svg>
                Add to repository
              </a>
            </li>
            <li>
              <a href="#"
                 className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                     viewBox="0 0 18 20">
                  <path
                      d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                </svg>
                Delete widget
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Line Chart -->
    <div className="py-6" id="pie-chart"></div>

  </div>
</template>

<script>
import ApexCharts from 'apexcharts';
import {getAxios} from "@/helpers/fetchPoint";
import {environment} from "@/environments/environment";

export default {
  data() {
    return {
      chart: null,
      chartData: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.loading = true;
        const response = await getAxios(`${environment.authAPI}/api/sector/getAllByColor`);
        if (response && response) {
          this.chartData = response;
        } else {
          console.error('Ошибка: данные отсутствуют или неправильный формат');
        }
        this.renderChart();
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        this.loading = false;
      }
    },
    renderChart() {
      if (typeof ApexCharts !== 'undefined' && Array.isArray(this.chartData) && this.chartData.length > 0) {
        const options = this.getChartOptions();
        this.chart = new ApexCharts(document.getElementById("pie-chart"), options);
        this.chart.render();
      } else {
        console.error('Ошибка: данные для графика отсутствуют или имеют неправильный формат');
      }
    },
    getChartOptions() {
      return {
        series: [
          this.chartData.find(i => i.color === 'Жакшы').amount,
          this.chartData.find(i => i.color === 'Орто').amount,
          this.chartData.find(i => i.color === 'Начар').amount,
        ],
        colors: ["#7fff00", "#ffff7f", "#ff9f7f"],
        chart: {
          height: 420,
          width: "100%",
          type: "pie",
        },
        stroke: {
          colors: ["white"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            labels: {
              show: true,
            },
            size: "100%",
            dataLabels: {
              offset: -25,
            },
          },
        },
        labels: ["Жашоо шарты жакшы үй-бүлө", "Орто үй-бүлө", "Жакыр үй-бүлө"],
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
            color: '#000',
          },
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value;
            },
            color: '#000'
          },
        },
        tooltip: {
          enabled: true,
          style: {
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'bold',
            color: '#000', // Начальный цвет текста
          },
          onDatasetHover: {
            highlightDataSeries: true,
          },
          theme: 'white', // Меняет цвет фона и текста на темный
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value;
            },
            color: '#000'
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
#pie-chart {
  width: 100%;
  height: 420px;
}
</style>
