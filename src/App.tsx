import React, {useEffect} from 'react';
import {Employees} from "./views/Employees";
import './App.scss'
import {useAppSelector} from "./hooks";
import {selectSelectedEmployeesIDs} from "./store/modules/employees";

function App() {
  const selectedEmployeesIDs = useAppSelector(selectSelectedEmployeesIDs)

  useEffect(() => {
    const IDs = JSON.stringify(selectedEmployeesIDs)
    localStorage.setItem('selectedEmployeesIDs', IDs)
  }, [selectedEmployeesIDs])

  return (
    <div className="app">
      <Employees/>
    </div>
  );
}

export default App;
