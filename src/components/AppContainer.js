import React, {Component} from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import SongDataApi from './api/SongDataApi'
import ChordsApi from './api/ChordsApi'
import YoutubeEmbed from './YoutubeEmbed'
import ChordsTrack from './ChordsTrack'
import ChordDiagram from './ChordDiagram'
import UniqueChords from './UniqueChords'
import ChordDiagramsCarousel from './ChordDiagramsCarousel'
import Loader from './Loader'
import Toolbar from './Toolbar'

const StyledAppContainer = styled.div`
  height:100vh;
  h1,h2,h3,h4,h5,h6,p,div {
    font-family:'Fira Sans';
  }
`
const StyledAppContainerInner = styled.div`
  height:100%;
  display:flex;
  flex-direction:column;
`
const YoutubeWrapper = styled.div`
  flex:1;
`

let progressInterval

class AppContainer extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      videoId: 'oKsxPW6i3pM',
      songData: null,
      chordsData: null,
      percentagePlayed: null,
      currentTime: null,
      currentChordIndex: 0,
      capo: 0,
      playbackSpeed: 1
    }
  }

  componentDidMount() {

    SongDataApi.getSongData(this.state.videoId).then(data => {
      this.setState({
        songData: data.song
      })
    }).catch(err => {
      console.log(err)
    })

    let chordsData = []
    ChordsApi.getChords().then(data => {
      data.chords.forEach(chord => {
        if (chord.instrument === 'Guitar') {
          chordsData.push(chord)
        }
      })
      this.setState({
        chordsData: chordsData
      })
    }).catch(err => {
      console.log(err)
    })

  }

  updateProgress = (e) => {
    if (e.data == YouTube.PlayerState.PLAYING) {
      const player = e.target
      const playerTotalTime = player.getDuration()
      progressInterval = setInterval(() => {
        const playerCurrentTime = player.getCurrentTime()
        this.setState({
          currentTime: playerCurrentTime
        })
        const percentagePlayed = (playerCurrentTime / playerTotalTime) * 100
        this.setState({percentagePlayed})
      }, 50)
    } else {
      clearInterval(progressInterval)
    }
  }

  updateCurrentChordIndex = (currentChordIndex) => {
    this.setState({currentChordIndex})
  }

  updateCapo = (capo) => {
    this.setState({capo})
    const newEvents = this.state.songData.song_events.map(chord => {
      this.state.chordsData.map(chordData => {
        if (chord.name === chordData.name) {
          chord.capoName = chordData.capo[capo] !== chord.name ? chordData.capo[capo] : undefined
        }
      })
      return chord
    })
    this.setState({
      songData: {
        ...this.state.songData,
        song_events: newEvents
      }
    })
  }

  updatePlaybackSpeed = (playbackSpeed) => {
    this.setState({playbackSpeed})
  }

  updateVideoId = (videoId) => {
    this.setState({videoId})
  }

  render() {
    return (
      <StyledAppContainer>
        {
          this.state.songData && this.state.chordsData ?
          <StyledAppContainerInner>
            {/* <UniqueChords chords={this.state.songData.unique_chords} chordsData={this.state.chordsData}/> */}
            <Toolbar 
              capo={this.state.capo}
              capoHandler={this.updateCapo}
              playbackSpeed={this.state.playbackSpeed}
              playbackSpeedHandler={this.updatePlaybackSpeed}
              videoId={this.state.videoId}
              videoIdHandler={this.state.updateVideoId}
            />
            <YoutubeWrapper>
              <YoutubeEmbed videoId={this.state.videoId} progressHandler={this.updateProgress}/>
              <ChordDiagramsCarousel 
                chords={this.state.songData.song_events}
                chordsData={this.state.chordsData}
                currentChordIndex={this.state.currentChordIndex}
              />
            </YoutubeWrapper>
            <ChordsTrack
              chords={this.state.songData.song_events}
              currentTime={this.state.currentTime}
              percentagePlayed={this.state.percentagePlayed}
              currentChordIndexHandler={this.updateCurrentChordIndex}
              currentChordIndex={this.state.currentChordIndex}
            />
          </StyledAppContainerInner>
          : null
        }
        <Loader loading={!this.state.songData || !this.state.chordsData}/>
      </StyledAppContainer>
    )
  }
}

export default AppContainer