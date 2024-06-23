export const Item = {
  id: "",
  name: "",
  title: "",
  type: "",
  section: "",
  w: 300,
  h: 250,
  metaData: {},
  itemData: {
    options: {
      chart: {
        id: "vue-chart",
        type: "",
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          borderRadiusApplication: 'end',
          horizontal: '',
        }
      },
      xaxis: {
        categories: [],
      },
    },
    series: [],
  },
};
