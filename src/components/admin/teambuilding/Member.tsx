import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface ItemProps {
  text: string;
  index: number;
}

const Member: React.FC<ItemProps> = ({ text, index }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          className="border-1 rounded-sm bg-pink-200"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
};

export default Member;
