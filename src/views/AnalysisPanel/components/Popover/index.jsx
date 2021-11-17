import React from 'react'
import './index.css'

export default function (props) {
  const {
    content,
    top,
    left,
    visibility,
  } = props;

  return (
    <>
      <div id="popover-container" style={{
        top: (top - 10 - 28) + 'px',
        left: (left - 40) + 'px',
        opacity: visibility ? 0.8 : 0
      }}>
        <p>{content}</p>
      </div>
      <div id="triangle" style={{
        top: (top - 10) + 'px',
        left: (left - 6) + 'px',
        opacity: visibility ? 0.8 : 0
      }} />
    </>
  )
}
