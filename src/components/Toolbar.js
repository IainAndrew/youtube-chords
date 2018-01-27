import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {darken} from 'polished'
import UniqueChords from './UniqueChords'
import ToolbarTool from './ToolbarTool'
import ToolbarCapo from './ToolbarCapo'

const StyledToolbar = styled.div`
  position:relative;
  width:100%;
  color:${colors.white};
`
const ToolbarList = styled.ul`
  margin:0;
  list-style:none;
  width:100%;
  display:flex;
  li {
    flex:1;
    background:${colors.primaryGradient};
    &:not(:last-child) {
      border-right:1px solid ${darken(0.2, colors.primary)};
    }
    a {
      padding:1rem 2rem;
      color:inherit;
      display:block;
      text-align:center;
    }
  }
`

const Toolbar = (props) => {
  return (
    <StyledToolbar>
      <ToolbarList>
        <ToolbarTool name="Capo">
          <ToolbarCapo capo={props.capo} capoHandler={props.capoHandler}/>
        </ToolbarTool>
        <ToolbarTool name="Playback speed">
        </ToolbarTool>
        <ToolbarTool name="Chords">
        </ToolbarTool>
        <ToolbarTool name="Change song">
        </ToolbarTool>
      </ToolbarList>
    </StyledToolbar>
  )
}

export default Toolbar