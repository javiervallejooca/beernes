import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Glass = ({ children }: Props) => {
  return <div className='glass'>{children}</div>;
};

export default Glass;
