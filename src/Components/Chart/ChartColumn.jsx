import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

export const ColumnChartKeterangan = ({data}) => {
  const categories = Object.keys(data);
  const seriesData = Object.values(data).map((value) => Object.values(value));
  console.log(seriesData)

  useEffect(() => {
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
      series: [
        { name: 'Tidak Masuk', data: seriesData.map((value) => value[1]) },
        { name: 'Sakit', data: seriesData.map((value) => value[2]) },
        { name: 'Izin', data: seriesData.map((value) => value[3]) },
        { name: 'Cuti', data: seriesData.map((value) => value[4]) },
      ],
    };

    // Membuat grafik kolom menggunakan konfigurasi yang telah ditentukan
    Highcharts.chart('column-chart-container', options);
  }, [categories, seriesData]);

  return <div id="column-chart-container"></div>;
};

export const ColumnChartPresence = ({ data }) => {
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
          name: 'Presensi',
          data: data.map(item => Object.values(item)[0]),
        },
      ],
    };

    Highcharts.chart('column-chart-presence', options);
  }, [data]);

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