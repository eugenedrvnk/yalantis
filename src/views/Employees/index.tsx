import {useEffect} from "react";
import styles from './index.module.scss'

import {useAppDispatch} from '../../hooks'

import {EmployeesAlphabetList} from "./AlphabetList";
import {EmployeesSelectedList} from "./SelectedList";

import {fetchEmployees} from "../../store/modules/employees";

const Employees = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [])

  return (
    <div className={styles.wrap}>
      <div>
        <h2>Employees</h2>
        <EmployeesAlphabetList/>
      </div>
      <div>
        <h2>Employees birthday</h2>
        <EmployeesSelectedList/>
      </div>
    </div>
  )
}

export {
  Employees
}
