import React from 'react';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  const nameLinkClassNames = ({isActive}: {isActive: boolean}) => {
    return isActive ? 'link link_active rounded text-secondary' : 'link text-secondary rounded'
  }

  return (
    <div className={'col-2 d-flex flex-column gap-4 p-3'}>
      <NavLink className={nameLinkClassNames} to={'/'} end>Send message</NavLink>
      <NavLink className={nameLinkClassNames} to={'/messages'}>Messages</NavLink>
    </div>
  );
};
