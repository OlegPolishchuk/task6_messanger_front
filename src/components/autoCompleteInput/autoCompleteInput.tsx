import React, {FC, useEffect, useState} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import Select from "react-select";
import {ExistedUsers} from "store/reducer/types/InitialState";

interface Props {
  items: ExistedUsers[];
  value: ExistedUsers;
  onChange: (value: ExistedUsers) => void;
}

interface ItemToSelect {
  label: string;
  value: string;
}

export const AutoCompleteInput: FC<Props> = ({items, onChange, value}) => {
  const [selectValue, setSelectValue] = useState({label: value.username, value: value.userId})

  const selectOptions: ItemToSelect[] = items.map(item => ({label: item.username, value: item.userId}))

  const itemsValuesList = items.map(item => item.username);


  const handleChange = (option: ItemToSelect | null) => {
    console.log('сработа handleChange', option)
    if (option) {
      onChange({userId: option.value, username: option.label})
    }
  }


  const handleBlur = () => {
    console.log('onBlur!!!')
    if (itemsValuesList.includes(selectValue.label)) {
      console.log(`itemsValusesList.include(${selectValue.label})`)

      const user = selectOptions.find(item => item.label === selectValue.label) as ItemToSelect

      handleChange(user)
    }
    else {
      console.log(`!itemsValusesList.include(${selectValue.label})`)
      handleChange(selectOptions[0])
    }
  }


  useEffect(() => {
    setSelectValue({label: value.username, value: value.userId})
  }, [value])

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup hasValidation className={'d-flex'}>
        <InputGroup.Text id="inputGroupPrepend">To</InputGroup.Text>

        <Select
          classNamePrefix="select"
          options={selectOptions}
          onChange={handleChange}
          onBlur={handleBlur}
          value={selectValue}
        />


        <Form.Control.Feedback type="invalid">
          Please choose a username
        </Form.Control.Feedback>

    </InputGroup>
</Form.Group>
)
  ;
};
