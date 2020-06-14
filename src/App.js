import React from 'react';
import './App.css';
import { Switch,Route } from "react-router-dom";
import Home from './Components/Home';
import CollectClinicals from './Components/CollectClinicals';
import AddPatient from './Components/AddPatient';
import AnalyzeData from './Components/AnalyzeData';
import ChartGenerator from './Components/ChartGenerator';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/patientDetails/:patientId" component={CollectClinicals} />
        <Route exact path="/addPatient" component={AddPatient} />
        <Route exact path="/analyze/:patientId" component={AnalyzeData} />
        <Route exact path="/chart/:patientId/:componentName" component={ChartGenerator} />
      </Switch>
        
    </div>
  );
}

export default App;
