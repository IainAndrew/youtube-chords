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
    colors.secondaryGradient
    : colors.primaryGradient
  )};
  display:inline-flex;
  align-items:center;
  text-transform:uppercase;
  text-shadow:-1px -1px ${rgba('#000', 0.1)};
  color:${colors.white};
  font-weight:bold;
  font-size:1.5em;
`

const Chord = (props) => (
  <StyledChord current={props.current} style={{width:Math.round(props.chord.duration * 100)}}>{props.chord.capoName || props.chord.name}</StyledChord>
)

export default Chord