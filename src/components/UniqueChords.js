import React, {Component} from 'react'
import ChordDiagram from './ChordDiagram'
import styled from 'styled-components'

const UniqueChordsWrapper = styled.div`
  display:flex;
  flex-wrap:wrap;
`
const UniqueChordWrapper = styled.div`
  flex:1;
  max-width:16rem;
`

const UniqueChords = (props) => {
  return (
    <UniqueChordsWrapper>
      {
        props.chordsData.filter(chordData => props.chords.indexOf(chordData.name) !== -1).map(chord => {
          return (
            <UniqueChordWrapper key={chord.name}>
              <ChordDiagram chord={chord}/>
            </UniqueChordWrapper>
          )
        })
      }
    </UniqueChordsWrapper>
  )
}

export default UniqueChords