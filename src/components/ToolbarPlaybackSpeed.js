import React from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import ToolbarTool from './ToolbarTool';

const PlaybackSpeedButtonGroup = styled.div`
  display:flex;
  width:100%;
`
const PlaybackSpeedButton = styled.a`
  display:inline-block;
  flex:1;
  padding:0.5rem;
  color:${props => props.active ? colors.white : colors.bodyFont};
  background:${props => props.active ? colors.secondary : colors.white};
  border-radius:3px;
  font-size:0.8em;
  &:hover, &:focus {
    color:${props => props.active ? colors.white : colors.bodyFont};
  }
  &:not(:last-child) {
    margin-right:0.2rem;
  }
`

const playbackSpeeds = [
  { name: '50%', value: 0.5 },
  { name: '75%', value: 0.75 },
  { name: '100%', value: 1 },
  { name: '125%', value: 1.25 },
  { name: '150%', value: 1.5 }
]

const ToolbarPlaybackSpeed = (props) => {
  return (
    <ToolbarTool>
      <h6>Playback speed</h6> 
      <PlaybackSpeedButtonGroup>
        {
          playbackSpeeds.map(speed => (
            <PlaybackSpeedButton key={speed.value} href="#" active={props.playbackSpeed === speed.value} onClick={e => { e.preventDefault(); props.playbackSpeedHandler(speed.value)}}>{speed.name}</PlaybackSpeedButton>
          ))
        }
      </PlaybackSpeedButtonGroup>
      <span>Tempo: {(props.tempo * props.playbackSpeed).toFixed(0)} bpm</span>
    </ToolbarTool>
  )
}

export default ToolbarPlaybackSpeed