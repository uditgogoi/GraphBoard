export const defaultBarChartValues = {
  options: {
    chart: {
      id: "vuechart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: 'series-2',
      data: [10, 20, 15, 40, 9, 30, 7, 9],
    },
  ],
};
