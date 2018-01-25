import React, {Component} from 'react'
import styled from 'styled-components'

const StyledChord = styled.div`
  padding:1rem;
  height:3rem;
  width:${props => `${props.width}px`};
  border-radius:3rem;
  background:white;
  display:inline-flex;
  align-items:center;
`

const Chord = ({chord}) => <StyledChord width={Math.round(chord.duration * 100)}>{chord.name}</StyledChord>

export default Chord