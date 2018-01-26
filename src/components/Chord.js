import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {rgba, darken} from 'polished'

const StyledChord = styled.div`
  padding:1rem;
  height:3rem;
  border-radius:0.5rem;
  border-right:2px solid ${colors.lightgrey};
  background:${props => (
    props.current ? 
      `linear-gradient(${darken(0.2, colors.primary)}, ${darken(0.4, colors.primary)})`
    : `linear-gradient(${colors.primary}, ${darken(0.2, colors.primary)})`
  )};
  display:inline-flex;
  align-items:center;
  text-transform:uppercase;
  text-shadow:-1px -1px ${rgba('#000', 0.1)};
  color:${colors.white};
  font-weight:bold;
  font-size:1.5em;
`

const Chord = ({chord, current}) => <StyledChord current={current} style={{width:Math.round(chord.duration * 100)}}>{chord.name}</StyledChord>

export default Chord