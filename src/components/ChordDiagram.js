import React, {Component} from 'react'
import styled, {extend} from 'styled-components'

const Fretboard = styled.div`
  position:relative;
  max-width:16rem;
  border:2px solid;
  border-left:0.6em solid;
  margin:1rem;
  border-radius:0.3em;
  &:before {
    content:"";
    display:block;
    padding-top:50%;
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
  width:1em;
  height:1em;
  border-radius:50%;
  background:red;
  left:${props => props.fret === '1' ? '12.5%' : props.fret === '2' ? '37.5%' : props.fret === '3' ? '62.5%' : props.fret === '4' ? '87.5%' : null};
  top:${props => props.string === 0 ? '100%' : props.string === 1 ? '80%' : props.string === 2 ? '60%' : props.string === 3 ? '40%' : props.string === 4 ? '20%' : props.string === 5 ? '0' : null};
  margin-left:-0.5em;
  margin-top:-0.5em;
  display:${props => props.fret === 'x' ? 'none' : props.fret === '0' ? 'none': 'block'};
  text-align:center;
  line-height:1em;
  color:#fff;
`

class ChordDiagram extends Component {

  getChordData = () => {
    return this.props.chordsData.find(chord => {
      return chord.name === this.props.chord
    })
  }

  render() {
    console.log(this.getChordData())
    return (
      <Fretboard>
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
            this.getChordData().shape.map((fret, index) => {
              return <Finger key={index} string={index} fret={fret}>{this.getChordData().fingers[index]}</Finger>
            })
          }
        </Fingers>
      </Fretboard>
    )
  }
}

export default ChordDiagram