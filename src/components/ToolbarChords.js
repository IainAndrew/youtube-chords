import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import ToolbarTool from './ToolbarTool';
import UniqueChordDiagrams from './UniqueChordDiagrams';
import {fadeIn, fadeOut} from './Animations'

const UniqueChordDiagramsWrapper = styled.div`
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  background:${colors.white};
  padding:2rem;
  z-index:1;
  width:90%;
  display:${props => props.open ? 'block' : 'none'};
  /* animation:${props => props.open ? `${fadeIn} 0.3s ease forwards` : `${fadeOut} 0.3s ease forwards`}; */
`
const UniqueChordDiagramsCloseButton = styled.a`
  display:block;
  position:absolute;
  top:1rem;
  right:1rem;
  color:${colors.bodyFont};
  padding:0.5rem;
  font-size:3em;
  line-height:1;
  &:hover, &:focus {
    color:${colors.bodyFont};
  }
`

class ToolbarChords extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chordDiagramsOpen: false
    }
  }

  openChordDiagrams = (e) => {
    e.preventDefault()
    this.setState({
      chordDiagramsOpen: true
    })
  }

  closeChordDiagrams = (e) => {
    e.preventDefault()
    this.setState({
      chordDiagramsOpen: false
    })
  }

  render() {
    return (
      <ToolbarTool>
        <a href="#" onClick={this.openChordDiagrams}>
          <h6>Chords</h6>
          {
            this.props.uniqueChords.map((uniqueChord, index) => (
              <span key={index}>{uniqueChord}{index !== this.props.uniqueChords.length - 1 ? ', ' : null}</span>
            ))
          }
        </a>
        <UniqueChordDiagramsWrapper open={this.state.chordDiagramsOpen}>
          <UniqueChordDiagramsCloseButton href="#" onClick={this.closeChordDiagrams}>×</UniqueChordDiagramsCloseButton>
          <UniqueChordDiagrams chords={this.props.uniqueChords} chordsData={this.props.chordsData}/>
        </UniqueChordDiagramsWrapper>
      </ToolbarTool>
    )
  }
}

export default ToolbarChords