import React, { Component } from 'react';
import './App.css';
import ControlPanel from './Components/ControlPanel';
import TableDisplay from './Components/TableDisplay';

export default function App() {
  return (
    <div className="App">
      <ControlPanel />
      <TableDisplay />
    </div>
  );
}