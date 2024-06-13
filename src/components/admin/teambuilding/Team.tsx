import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Member from './Member';
import { Button, Spacer } from '@nextui-org/react';

interface ColumnProps {
  col: {
    id: string;
    list: string[];
  };
  handleDeleteTeam: (id: string) => void;
}

const Team: React.FC<ColumnProps> = ({
  col: { list, id },
  handleDeleteTeam,
}) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      {loaded && (
        <Droppable droppableId={id}>
          {(provided) => (
            <div className='p-2 flex flex-col mt-2'>
              <h2>{id}</h2>
              <div
                className='bg-slate-400 rounded-md p-2 flex flex-col min-h-[150px]'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((text, index) => (
                  <Member key={text} text={text} index={index} />
                ))}
                {provided.placeholder}
              </div>
              <Spacer y={2} />
              <Button onClick={() => handleDeleteTeam(id)}>삭제</Button>
            </div>
          )}
        </Droppable>
      )}
    </>
  );
};

export default Team;
