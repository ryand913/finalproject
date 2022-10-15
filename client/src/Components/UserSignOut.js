import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
  context.actions.signOut();
  console.log(context.actions)
  return (
    <Redirect to="/" />
  );
}
  