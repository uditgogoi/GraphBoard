export const BarItem = {
  id: "",
  name: "",
  title: "",
  type: "",
  section: "",
  w: 300,
  h: 250,
  x:'',
  y:'',
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
  title: "",
  type: "",
  itemData:{
    value:0,
    description:'Daily active users',
    suffixText:"than yesterday",
    trendValue:'24',
    trendIncrement:true,
    trendType:'%',
    infoText:'Number of users who logged into the product in one day',
  },
  metaData:{},
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
