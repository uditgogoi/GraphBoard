export const BarItem = {
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
        id: "",
        type: "",
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          borderRadiusApplication: "end",
          horizontal: "",
        },
      },
      xaxis: {
        categories: [],
      },
    },
    series: [],
  },
};

export const StatisticItem = {
  id: "",
  name: "",
  title: "",
  type: "",
  value:'',
  description:'',
  w: 250,
  h: 250,
};


export const TableItem = {
  id: "",
  name: "",
  title: "",
  type: "",
  value:'',
  description:'',
  w: 650,
  h: 350,
};
