import React, {Component} from 'react'
import styled, {extend} from 'styled-components'
import {colors} from './Variables'
import {rgba} from 'polished'

const ChordDiagramWrapper = styled.div`
  position:relative;
  padding:1rem 2rem;
  // max-width:100%;
  width:16rem;
  transform:${props => props.isCurrent ? 'none' : 'scale(0.8)'};
  background:${props => props.isCurrent ? colors.white : rgba(colors.white, 0.7)};
  transition:all 0.3s ease;
  border-radius:0.5rem;
  color:${colors.bodyFont};
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
  background-color:${colors.lightgrey};
  &:before {
    content:"";
    display:block;
    padding-top:60%;
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
const fingerSize = '1.2rem';
const Finger = styled.div`
  position:absolute;
  border-radius:50%;
  background:${colors.secondary};
  width:${fingerSize};
  height:${fingerSize};
  left:${props => props.fret === '1' ? '12.5%' : props.fret === '2' ? '37.5%' : props.fret === '3' ? '62.5%' : props.fret === '4' ? '87.5%' : null};
  top:${props => props.string === 0 ? '100%' : props.string === 1 ? '80%' : props.string === 2 ? '60%' : props.string === 3 ? '40%' : props.string === 4 ? '20%' : props.string === 5 ? '0' : null};
  margin-left:calc(-${fingerSize} / 2);
  margin-top:calc(-${fingerSize} / 2);
  // display:${props => props.fret === 'x' ? 'none' : props.fret === '0' ? 'none': 'block'};
  text-align:center;
  line-height:${fingerSize};
  color:#fff;
  transform:${props => props.rotated ? 'rotate(-90deg)' : 'none'};
  transition:transform 0.3s ease;
  box-shadow:0 2px 5px ${rgba('#000', 0.2)};
  &.x, &.zero {
    background:none;
    box-shadow:none;
    padding:0;
    left:-${fingerSize};
  }
  &.x {
    color:${colors.bodyFont};
  }
  &.zero {
    color:${colors.secondary};
  }
`
const ChordName = styled.h4`
  text-align:center;
  text-transform:uppercase;
`;

class ChordDiagram extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotated: false
    }
  }

  render() {
    return (
      <div>
        <ChordDiagramWrapper isCurrent={this.props.isCurrent}>
          <ChordName>{this.props.chord.name}</ChordName>
          <Fretboard rotated={this.props.rotated}>
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
            {
              this.props.chord.shape ?
                <Fingers>
                  {
                    this.props.chord.shape.map((fret, index) => (
                      <Finger
                        key={index}
                        string={index}
                        fret={fret}
                        rotated={this.props.rotated}
                        className={fret === 'x' ? 'x' : fret === '0' ? 'zero' : undefined}
                      >
                        {fret === 'x' ? '×' : fret === '0' ? 'o' : this.props.chord.fingers[index]}
                      </Finger>
                    ))
                  }
                </Fingers>
              : null
            }
          </Fretboard>
        </ChordDiagramWrapper>
      </div>
    )
  }
}

export default ChordDiagram