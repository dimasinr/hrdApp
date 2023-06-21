import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function calculateCol(data) {
  var hasil = [];
  var i 
  // Menginisialisasi hasil dengan 0
  for (i = 0; i < data[0]?.length; i++) {
    hasil[i] = 0;
  }

  // Menjumlahkan elemen di setiap kolom
  for ( i = 0; i < data?.length; i++) {
    for (var j = 0; j < data[i]?.length; j++) {
      hasil[j] += data[i][j];
    }
  }

  return hasil;
}

export const ColumnChartKeterangan = ({data}) => {
  const categories = Object.keys(data);
  const seriesData = Object.values(data).map((value) => Object.values(value));
  // const dataHasil = calculateCol(seriesData);

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Grafik Data Karyawan',
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: 'Jumlah',
      },
    },
    legend: {
      enabled: true,
    },
    series: [
      { name: `Tidak Masuk`, data: seriesData.map((value) => value[0]) },
      { name: `Sakit`, data: seriesData.map((value) => value[1]) },
      { name: `Izin`, data: seriesData.map((value) => value[2]) },
      { name: `Cuti`, data: seriesData.map((value) => value[3]) },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export const ColumnChartPresence = ({ data }) => {
  const seriesData = Object.values(data).map((value) => Object.values(value));
  const dataHasil = calculateCol(seriesData)
  useEffect(() => {
    const options = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Grafik Data Presensi per Bulan',
      },
      xAxis: {
        categories: data.map(item => Object.keys(item)[0]),
      },
      yAxis: {
        title: {
          text: 'Jumlah Presensi',
        },
      },
      series: [
        {
          name: `${dataHasil[0]} Presensi`,
          data: data.map(item => Object.values(item)[0]),
        },
      ],
    };

    Highcharts.chart('column-chart-presence', options);
  }, [data, dataHasil]);

  return <div id="column-chart-presence"></div>;
};

export const ChartsColumnAbsensiPerkaryawan = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Grafik Data Presensi Per Karyawan dalam satu bulan ',
        },
        xAxis: {
          categories: data.map(item => Object.keys(item)[0]),
        },
        yAxis: {
          title: {
            text: 'Total Attendance',
          },
        },
        series: [{
          name: 'Total Attendance',
          data: data.map(item => Object.values(item)[0]),
        }],
      });
    }
  }, [data]);

  return <div ref={chartRef} />;
};