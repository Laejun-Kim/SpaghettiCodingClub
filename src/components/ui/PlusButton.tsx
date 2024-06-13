import React from 'react';

interface Props {
  onClick?: () => void;
}

const PlusButton = ({ onClick }: Props) => {
  return (
    <div
      className='bg-slate-500 w-full flex justify-center cursor-pointer'
      onClick={onClick}
    >
      +
    </div>
  );
};

export default PlusButton;
