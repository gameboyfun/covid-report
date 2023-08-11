<template>
  <div>
    <b-table
      class="text-center align-items-center"
      id="my-table"
      :items="items"
      :fields="fields"
      :per-page="10"
      :current-page="currentPage"
      responsive
      show-empty
      hover
      striped
      head-variant="dark"
    >
      <template #empty>
        <div class="d-flex justify-content-center my-2">
          <h5>ไม่พบข้อมูล</h5>
        </div>
      </template>
      <template #cell(cases)="data">
        <div>
          {{ new Intl.NumberFormat("th-TH").format(data.value) }}
        </div>
      </template>
      <template #cell(deaths)="data">
        <div>
          {{ new Intl.NumberFormat("th-TH").format(data.value) }}
        </div>
      </template>
      <template #cell(recovered)="data">
        <div>
          {{ new Intl.NumberFormat("th-TH").format(data.value) }}
        </div>
      </template>
    </b-table>
    <b-row>
      <b-col class="d-flex justify-content-center">
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          :per-page="10"
          aria-controls="my-table"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  watch: {
    items(val) {
      if (val) {
        this.currentPage = 1;
      }
    },
  },
  data() {
    return {
      currentPage: 1,
      fields: [
        { key: "date", label: "Date" },
        { key: "cases", label: "Cases" },
        { key: "deaths", label: "Deaths" },
        { key: "recovered", label: "Recovered" },
      ],
    };
  },
};
</script>
