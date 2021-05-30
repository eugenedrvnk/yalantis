import styles from './index.module.scss'

import {useAppSelector} from "../../../hooks";
import {selectSortedEmployees} from "../../../store/modules/employees";
import {useMemo} from "react";
import {IEmployee} from "../../../types";
import {MONTHS} from "../../../constants";
import {SelectedListItem} from "./Item";

const EmployeesSelectedList = () => {
  const sortedEmployees = useAppSelector(selectSortedEmployees)

  const grouppedByMonthEmployees = useMemo(() => {
    const selectedEmployees = sortedEmployees.filter((employee) => employee.isActive).reverse()

    const employees: { [key: number]: Array<IEmployee> } = {}

    selectedEmployees.forEach((employee) => {
      const month = new Date(employee.dob).getMonth()
      if (employees[month]?.length) employees[month].push(employee)
      else employees[month] = [employee]
    })

    return employees
  }, [sortedEmployees])

  return (
    <div>
      {
        [4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3].map(month => {
            const employees = grouppedByMonthEmployees[month]

            return (
              employees?.length && (
                <div
                  className={styles.itemWrap}
                  key={month}
                >
                  <h3>{MONTHS[month]}</h3>
                  {employees.map((employee) => (
                    <SelectedListItem
                      key={employee.id}
                      {...employee}
                    />
                  ))}
                </div>
              )
            )
          }
        )}
    </div>
  )
}

export {
  EmployeesSelectedList
}
