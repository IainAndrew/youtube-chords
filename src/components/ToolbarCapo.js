import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {darken} from 'polished'

const ToolbarCapo = (props) => {
  return (
    <div>
      Capo on fret 
      <input type="number" min="0" max="12" value={props.capo} onChange={(e) => props.capoHandler(parseInt(e.target.value))}/>
    </div>
  )
}

export default ToolbarCapo