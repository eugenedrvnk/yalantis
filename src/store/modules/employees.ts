import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, AppThunk} from '../../store';
import {IEmployee} from "../../types";

export interface IEmployeesState {
  list: Array<IEmployee>;
  selectedIDs: { [key: string]: true },
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IEmployeesState = {
  list: [],
  selectedIDs: JSON.parse(localStorage.getItem('selectedEmployeesIDs')!) || {},
  status: 'idle',
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    SET_EMPLOYEES: (state, action: PayloadAction<Array<IEmployee>>) => {
      state.list = action.payload
    },
    SELECT_EMPLOYEE: (state, action: PayloadAction<string>) => {
      const employeeToSelect = state.list.find(employee => employee.id === action.payload)
      if (employeeToSelect) {
        employeeToSelect.isActive = true
        state.selectedIDs[action.payload] = true
      }
    },
    UNSELECT_EMPLOYEE: (state, action: PayloadAction<string>) => {
      const employeeToUnselect = state.list.find(employee => employee.id === action.payload)
      if (employeeToUnselect) {
        employeeToUnselect.isActive = false
        delete state.selectedIDs[action.payload]
      }
    }
  },
});

export const {SET_EMPLOYEES, SELECT_EMPLOYEE, UNSELECT_EMPLOYEE} = employeesSlice.actions;

export const fetchEmployees = (): AppThunk => (dispatch, getState) => {
  const selectedIDs = getState().employees.selectedIDs

  fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
    .then((response) => {
      return response.json();
    })
    .then((employees) => {
      dispatch(SET_EMPLOYEES(employees.map((employee: any) => (
        {
          ...employee,
          isActive: selectedIDs[employee.id] || false
        }
      ))))
    })
}

export const selectSelectedEmployeesIDs = (state: RootState) => state.employees.selectedIDs
export const selectSortedEmployees = (state: RootState) => {
  return state.employees.list.slice().sort((a, b) => a.lastName > b.lastName ? 1 : -1)
}

export default employeesSlice.reducer;
