import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, ComposedChart, Legend, Bar, Line } from 'recharts';

export const UserChartComponents = ({ chartData }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart width={730} height={250} data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            {/* <Area type="monotone" dataKey="total_jam" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
            </AreaChart>
      </ResponsiveContainer>
    );
  };

  export const HREmployeeChartComponents = ({ chartData }) => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart width={730} height={250} data={chartData}>
          <XAxis dataKey="employee_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="total_attendance" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="total_attendance" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="total_attendance" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  export const UserChartPieComponents = ({ chartData, label, color }) => {
    return (
      <ResponsiveContainer width="100%" height={245}>
      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={label}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    );
  };
