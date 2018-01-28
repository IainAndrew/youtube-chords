import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {darken} from 'polished'
import ToolbarCapo from './ToolbarCapo'
import ToolbarPlaybackSpeed from './ToolbarPlaybackSpeed'
import ToolbarVideoId from './ToolbarVideoId'
import ToolbarChords from './ToolbarChords'

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
  }
`

const Toolbar = (props) => {
  return (
    <StyledToolbar>
      <ToolbarList>
        <ToolbarCapo capo={props.capo} capoHandler={props.capoHandler}/>
        <ToolbarPlaybackSpeed playbackSpeed={props.playbackSpeed} playbackSpeedHandler={props.playbackSpeedHandler} tempo={props.tempo}/>
        <ToolbarChords uniqueChords={props.uniqueChords} chordsData={props.chordsData}/>
        <ToolbarVideoId videoIdHandler={props.videoIdHandler} videoIdError={props.videoIdError}/>
      </ToolbarList>
    </StyledToolbar>
  )
}

export default Toolbar