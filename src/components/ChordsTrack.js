import React, {Component} from 'react'
import styled from 'styled-components'
import Chord from './Chord'

const StyledChordsTrackWrapper = styled.div`
  position:relative;
  width:100%;
  background:indianred;
  overflow:hidden;
  padding:0.5rem 0;
`
const StyledChordsTrack = styled.div`
  position:relative;
  left:50%;
  width:${props => `${props.width}px`};
`
const Marker = styled.div`
  position:absolute;
  top:0;
  left:50%;
  width:1px;
  height:100%;
  background:red;
`

class ChordsTrack extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      trackLength: 0,
      trackOffset: 0
    }
  }

  componentWillMount() {
    let length = 0
    this.props.chords.map((chord, index) => {
      length += Math.round(chord.duration * 100)
    })
    this.setState({
      trackLength: length
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.percentagePlayed !== this.props.percentagePlayed) {
      this.setState({
        trackOffset: -((nextProps.percentagePlayed * this.state.trackLength / 100))
      })
      const currentChordIndex = this.props.chords.findIndex(chord => chord.beat_time <= this.props.currentTime && (chord.beat_time + chord.duration) > this.props.currentTime)
      this.props.currentChordIndecesHandler(currentChordIndex, currentChordIndex - 1, currentChordIndex + 1)
    }
  }

  render() {
    return (
      <StyledChordsTrackWrapper>
        <StyledChordsTrack width={this.state.trackLength} style={{transform: `translateX(${this.state.trackOffset}px)`}}>
          {
            this.props.chords.map(chord => <Chord key={chord.beat_time} chord={chord}/>)
          }
        </StyledChordsTrack>
        <Marker/>
      </StyledChordsTrackWrapper>
    )
  }
}

export default ChordsTrack