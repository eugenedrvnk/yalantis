import {IEmployee} from "../../../../types";

import styles from './index.module.scss'
import cn from 'classnames'

export interface IAlphabetListItemProps extends IEmployee {
  onSelectionChange: (value: boolean) => void
}

const AlphabetListItem = (
  {
    firstName,
    lastName,
    isActive,
    onSelectionChange
  }: IAlphabetListItemProps
) => (
  <div>
    <h5 className={cn({[styles.title]: true, [styles.titleSelected]: isActive})}>{lastName + firstName}</h5>
    <label className={styles.radioButton}>
      <input
        type="radio"
        checked={!isActive}
        onChange={() => onSelectionChange(false)}
      />
      <span>not active</span>
    </label>
    <label className={styles.radioButton}>
      <input
        type="radio"
        checked={isActive}
        onChange={() => onSelectionChange(true)}
      />
      <span>active</span>
    </label>
  </div>
)

export {
  AlphabetListItem
}
