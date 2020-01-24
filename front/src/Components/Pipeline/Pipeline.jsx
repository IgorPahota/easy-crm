import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import NewLeadBtn from "./NewLeadBtn/NewLeadBtn";
import NewStageBtn from "./NewStageBtn/NewStageBtn";

const itemsFromBackend = [
  {
    id: uuid(),
    name: "First task",
    price: "214 $",
    contactname: "Bill O'Brian",
    contactnumber: "23782454326",
    company: "Random Inc."
  },
  {
    id: uuid(),
    name: "Second task",
    price: "50 $",
    contactname: "Bill O'Brian",
    contactnumber: "23782454326",
    company: "Random Inc."
  },
  {
    id: uuid(),
    name: "Third task",
    price: "105 $",
    contactname: "Bill O'Brian",
    contactnumber: "23782454326",
    company: "Random Inc."
  },
  {
    id: uuid(),
    name: "Fourth task",
    price: "21 $",
    contactname: "Bill O'Brian",
    contactnumber: "23782454326",
    company: "Random Inc."
  },
  {
    id: uuid(),
    name: "Fifth task",
    price: "245 $",
    contactname: "Bill O'Brian",
    contactnumber: "23782454326",
    company: "Random Inc."
  }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

export default function Pipeline() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name.toUpperCase()}</h2>
              <div style={{ margin: 10 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 160,
                          borderRadius: "8px"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "8px 4px 8px 4px",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      borderRadius: "8px",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.name}
                                    <br />
                                    {item.price}
                                    <br />
                                    {item.contactname}
                                    <br />
                                    {item.contactnumber}
                                    <br />
                                    {item.company}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              <NewLeadBtn />
            </div>
          );
        })}
      </DragDropContext>
      <NewStageBtn />
    </div>
  );
}
