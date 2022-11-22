import React, {FC, useState} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import Select from "react-select";
import {ExistedUsers} from "store/reducer/types/InitialState";

interface Props {
  items: ExistedUsers[];
  value: string;
  onChange: (value: ExistedUsers) => void;
}

interface ItemToSelect {
  label: string;
  value: string;
}

export const AutoCompleteInput: FC<Props> = ({items, onChange, value}) => {
  const itemsToSelect: ItemToSelect[] = items.map(item => ({label: item.username, value: item.userId}))

  const handleChange = (option: ItemToSelect | null) => {
    if (option) {
      onChange({userId: option.value, username: option.label})
    }
  }

  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup hasValidation className={'d-flex'}>
        <InputGroup.Text id="inputGroupPrepend">To</InputGroup.Text>

        <Select
          classNamePrefix="select"
          options={itemsToSelect}
          onChange={handleChange}
        />


        <Form.Control.Feedback type="invalid">
          Please choose a username
        </Form.Control.Feedback>

    </InputGroup>
</Form.Group>
)
  ;
};
