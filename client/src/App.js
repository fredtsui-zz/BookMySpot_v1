import React, { Component } from 'react';
import './App.css';
import ControlPanel from './Components/ControlPanel';
import TableDisplay from './Components/TableDisplay';

export default function App() {
  const [data, setData] = React.useState([]);
  return (
    <div className="App">
      <ControlPanel updateData={setData}/>
      <TableDisplay data={data}/>
    </div>
  );
}