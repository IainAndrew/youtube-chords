import React from 'react'
import styled from 'styled-components'
import ToolbarTool from './ToolbarTool';

const CapoInput = styled.input`
  width:4rem;
  display:inline-block;
  margin-left:0.5rem;
  margin-bottom:0;
`

const ToolbarCapo = (props) => {
  return (
    <ToolbarTool>
      <h6>Capo</h6>
      Capo on fret 
      <CapoInput type="number" min="0" max="12" value={props.capo} onChange={(e) => props.capoHandler(parseInt(e.target.value))}/>
    </ToolbarTool>
  )
}

export default ToolbarCapo