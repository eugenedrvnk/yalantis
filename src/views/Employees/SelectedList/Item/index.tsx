import {IEmployee} from "../../../../types";
import {MONTHS} from "../../../../constants";

const SelectedListItem = (
  {
    firstName,
    lastName,
    dob
  }: IEmployee
) => {
  const date = new Date(dob)

  return (
    <h4>
      {`${firstName} ${lastName} ${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()} year`}
    </h4>
  )
}

export {
  SelectedListItem
}
