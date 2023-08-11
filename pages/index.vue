<template>
  <div class="container my-5">
    <b-row>
      <b-col cols="12" class="text-center">
        <h3>Covid Report</h3>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Month">
          <date-picker
            class="w-100"
            v-model="month"
            type="month"
            placeholder="Select month"
            format="M/YY"
            value-type="M/YY"
            @input="updateFilteredData"
            :clearable="false"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" md>
        <b-form-group label="Country">
          <v-select
            v-model="country"
            :options="countriesOptions"
            label="text"
            :reduce="(text) => text.value"
            @input="updateFilteredData"
            :clearable="false"
          >
            <template #no-options> ไม่พบข้อมูล </template>
          </v-select>
        </b-form-group>
      </b-col>
    </b-row>

    <client-only v-if="!loading">
      <Chart :data="chartData" :options="Options" :height="150" />
      <Table :items="items" class="mt-4" />
    </client-only>
    <div
      v-else
      style="height: 500px"
      class="d-flex justify-content-center align-items-center"
    >
      <b-spinner variant="primary" label="Spinning" class="mr-2" />Loading...
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getAll();
  },
  components: {
    Chart: () => import(`~/components/LineChart.vue`),
    Table: () => import(`~/components/Table.vue`),
  },
  data() {
    return {
      loading: false,
      month: this.$moment().format(`M/YY`),
      country: null,
      countriesOptions: [],
      data: [],
      items: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "cases",
            data: [],
            fill: false,
            borderColor: "rgb(0, 0, 255)",
            tension: 0.1,
          },
          {
            label: "deaths",
            data: [],
            fill: false,
            borderColor: "rgb(255,0,0)",
            tension: 0.1,
          },
          {
            label: "recovered",
            data: [],
            fill: false,
            borderColor: "rgb(0,252,0)",
            tension: 0.1,
          },
        ],
      },
      Options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: null,
        },
      },
    };
  },
  methods: {
    async getAll() {
      try {
        this.loading = true;
        const response = await this.$axios.get(`/v3/covid-19/historical`, {
          params: { lastdays: "all" },
        });
        this.data = response.data;
        this.countriesOptions = response.data.map((data) => ({
          text: data.province
            ? `${data.country} (${data.province})`
            : data.country,
          value: data.province
            ? `${data.country}|${data.province}`
            : data.country,
        }));
        this.country = this.countriesOptions[0].value;
        this.updateFilteredData();
      } catch (error) {
        this.loading = false;
        this.$toast.error(error);
      }
    },
    updateFilteredData() {
      this.loading = true;
      setTimeout(() => {
        const [selectedCountry, selectedProvince] = this.country.split("|");
        const countryData = this.data.find((data) => {
          if (!selectedProvince) {
            return data.country === selectedCountry;
          } else {
            return (
              data.country === selectedCountry &&
              data.province === selectedProvince
            );
          }
        });

        const [selectedMonth, selectedYear] = this.month.split("/");
        const daysInMonth = this.$moment(this.month, "M/YY").daysInMonth();
        this.$set(
          this.chartData,
          "labels",
          Array.from(
            { length: daysInMonth },
            (_, i) => `${i + 1}/${selectedMonth}/${selectedYear}`
          )
        );
        const cases = Array.from(
          { length: daysInMonth },
          (_, i) =>
            countryData.timeline.cases[
              `${selectedMonth}/${i + 1}/${selectedYear}`
            ] || 0
        );
        const deaths = Array.from(
          { length: daysInMonth },
          (_, i) =>
            countryData.timeline.deaths[
              `${selectedMonth}/${i + 1}/${selectedYear}`
            ] || 0
        );
        const recovered = Array.from(
          { length: daysInMonth },
          (_, i) =>
            countryData.timeline.recovered[
              `${selectedMonth}/${i + 1}/${selectedYear}`
            ] || 0
        );

        this.$set(this.chartData.datasets[0], "data", cases);
        this.$set(this.chartData.datasets[1], "data", deaths);
        this.$set(this.chartData.datasets[2], "data", recovered);
        this.items = Array.from({ length: daysInMonth }, (_, i) => ({
          date: `${i + 1}/${selectedMonth}/${selectedYear}`,
          cases: cases[i],
          deaths: deaths[i],
          recovered: recovered[i],
        }));
        this.loading = false;
      }, 500);
    },
  },
};
</script>
