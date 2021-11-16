import React from 'react';
import {Draggable, Droppable} from "react-beautiful-dnd";

// 不想将react-beautiful-dnd原先的children设置为函数，而是想用ReactNode，重新封装该组件
export const Drop = ({children, ...props}) => {
  return <Droppable {...props}>
    {
      (provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div/>
      })
    }
  </Droppable>
}

export const DropChild = React.forwardRef(
  ({children, ...props}, ref) => <div ref={ref} {...props}>
    {children}
    {props.provided?.placeholder}
  </div>
)

export const Drag = ({children, ...props}) => {
  return <Draggable {...props}>
    {
      provided => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
      }
    }
  </Draggable>
}
