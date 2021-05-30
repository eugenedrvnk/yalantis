import {ALPHABET} from "../../../constants";

import styles from './index.module.scss'

import {IEmployee} from "../../../types";

import {useMemo} from "react";
import {useAppSelector, useAppDispatch} from "../../../hooks";
import {selectSortedEmployees} from "../../../store/modules/employees";

import {SELECT_EMPLOYEE, UNSELECT_EMPLOYEE} from '../../../store/modules/employees'

import {AlphabetListItem} from "./Item";

const EmployeesAlphabetList = () => {
  const dispatch = useAppDispatch()
  const sortedEmployees = useAppSelector(selectSortedEmployees)

  const grouppedByLetterEmployees = useMemo(() => {
    const employees: { [key: string]: Array<IEmployee> } = {}

    sortedEmployees.forEach((employee) => {
      const letter = employee.lastName.slice(0, 1)
      if (employees[letter]?.length) employees[letter].push(employee)
      else employees[letter] = [employee]
    })

    return employees
  }, [sortedEmployees])

  const handleSelectionChange = ({id, value}: {id: string, value: boolean}) => {
    if (value) dispatch(SELECT_EMPLOYEE(id))
    else dispatch(UNSELECT_EMPLOYEE(id))
  }

  return (
    <div className={styles.wrap}>
      {
        ALPHABET.map(letter => {
          const employees = grouppedByLetterEmployees[letter]

          return (
            <div
              key={letter}
              className={styles.itemWrap}
            >
              <h3>{letter}</h3>
              {employees?.length ? employees.map((employee: IEmployee) => (
                <AlphabetListItem
                  key={employee.id}
                  {...employee}
                  onSelectionChange={value => handleSelectionChange({id: employee.id, value})}
                />
              )) : (
                <span>-----</span>
              )}
            </div>
          )
        })
      }
    </div>

  )
}

export {
  EmployeesAlphabetList
}
