import React, {Component} from 'react'
import styled, {extend} from 'styled-components'

const ChordDiagramWrapper = styled.div`
  position:relative;
  padding:1.3rem;
  transform:${props => props.status === 'previous' || props.status === 'next' ? 'scale(0.8)' : null};
`
const Fretboard = styled.div`
  position:relative;
  /* max-width:16rem; */
  width:100%;
  border:2px solid;
  border-left:0.6em solid;
  border-radius:0.3em;
  transform:${props => props.rotated ? 'rotate(90deg)' : 'none'};
  transition:all 0.3s ease;
  &:before {
    content:"";
    display:block;
    padding-top:60%;
  }
  &:after {
    content:"";
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-image:url('../src/img/wood.png');
    z-index:-1;
    opacity:0.2;
  }
`
const Frets = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
`
const Fret = styled.div`
  position:absolute;
  width:2px;
  height:100%;
  top:0;
  background:currentColor;
  &:first-child {
    left:calc(25% - 1px);
  }
  &:nth-child(2) {
    left:calc(50% - 1px);
  }
  &:nth-child(3) {
    left:calc(75% - 1px);
  }
`
const Strings = Frets.extend`
  top:50%;
  height:85%;
  transform:translateY(-50%);
`
const String = styled.div`
  position:absolute;
  width:100%;
  height:1px;
  left:0;
  background:currentColor;
  &:first-child {
    top:0;
  }
  &:nth-child(2) {
    top:20%;
  }
  &:nth-child(3) {
    top:40%;
  }
  &:nth-child(4) {
    top:60%;
  }
  &:nth-child(5) {
    top:80%;
  }
  &:nth-child(6) {
    top:100%;
  }
`
const Fingers = Strings.extend``;
const Finger = styled.div`
  position:absolute;
  width:1rem;
  height:1rem;
  border-radius:50%;
  background:red;
  left:${props => props.fret === '1' ? '12.5%' : props.fret === '2' ? '37.5%' : props.fret === '3' ? '62.5%' : props.fret === '4' ? '87.5%' : null};
  top:${props => props.string === 0 ? '100%' : props.string === 1 ? '80%' : props.string === 2 ? '60%' : props.string === 3 ? '40%' : props.string === 4 ? '20%' : props.string === 5 ? '0' : null};
  margin-left:-0.5rem;
  margin-top:-0.5rem;
  display:${props => props.fret === 'x' ? 'none' : props.fret === '0' ? 'none': 'block'};
  text-align:center;
  line-height:1rem;
  color:#fff;
  font-size:0.7em;
  transform:${props => props.rotated ? 'rotate(-90deg)' : 'none'};
  transition:transform 0.3s ease;
`
const RotateButton = styled.a`
  position:absolute;
  bottom:0;
  right:0;
  color:inherit;
  font-size:1.3em;
  &:hover, &:focus {
    color:inherit;
  }
`
const ChordName = styled.h4`
  text-align:center;
`;


class ChordDiagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotated: false
    }
  }

  rotateDiagram = (e) => {
    e.preventDefault()
    this.setState(({rotated}) => ({
      rotated: !rotated,
    }))
  }

  render() {
    return (
      <div>
        {
          this.props.chord ?
            <ChordDiagramWrapper status={this.props.status}>
            <ChordName>{this.props.chord.name}</ChordName>
            <Fretboard rotated={this.state.rotated}>
              <Frets>
                <Fret/>
                <Fret/>
                <Fret/>
              </Frets>
              <Strings>
                <String/>
                <String/>
                <String/>
                <String/>
                <String/>
                <String/>
              </Strings>
              <Fingers>
                {
                  this.props.chord.shape.map((fret, index) => {
                    return <Finger key={index} string={index} fret={fret} rotated={this.state.rotated}>{this.props.chord.fingers[index]}</Finger>
                  })
                }
              </Fingers>
            </Fretboard>
            <RotateButton href="#" onClick={this.rotateDiagram}>{this.state.rotated ? '↺' : '↻'}</RotateButton>
          </ChordDiagramWrapper>
          : null
        }
      </div>
    )
  }
}

export default ChordDiagram