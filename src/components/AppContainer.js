import React, {Component} from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import SongDataApi from './api/SongDataApi'
import ChordsApi from './api/ChordsApi'
import YoutubeEmbed from './YoutubeEmbed'
import ChordsTrack from './ChordsTrack'
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
      loadingApp: true,
      loadingSong: false,
      videoId: 'oKsxPW6i3pM',
      videoIdError: null,
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
    this.getSongData()
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

  getSongData = () => {
    this.setState({
      loadingSong: true
    })
    SongDataApi.getSongData(this.state.videoId).then(data => {
      this.setState({
        songData: data.song,
        capo: 0,
        percentagePlayed: null,
        currentTime: null,
        playbackSpeed: 1,
        currentChordIndex: 0,
        loadingSong: false,
        loadingApp: false
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

  extractYoutubeVideoId = (url) => {
    let videoId = url.split('v=')[1]
    if (!videoId) return new Error('Error: not a valid Youtube URL')
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition)
    }
    return videoId;
  }

  updateVideoId = (url) => {
    this.setState({
      videoIdError: null
    })
    if (this.extractYoutubeVideoId(url) instanceof Error) {
      return this.setState({
        videoIdError: this.extractYoutubeVideoId(url)
      })
    }
    this.setState({
      videoId: this.extractYoutubeVideoId(url)
    }, () => {
      this.getSongData()
    })
  }

  render() {
    return (
      <StyledAppContainer>
        {
          !this.state.loadingSong && this.state.songData && this.state.chordsData ?
          <StyledAppContainerInner>
            {/* <UniqueChords chords={this.state.songData.unique_chords} chordsData={this.state.chordsData}/> */}
            <Toolbar 
              capo={this.state.capo}
              capoHandler={this.updateCapo}
              playbackSpeed={this.state.playbackSpeed}
              tempo={this.state.songData.tempo}
              playbackSpeedHandler={this.updatePlaybackSpeed}
              uniqueChords={this.state.songData.unique_chords}
              chordsData={this.state.chordsData}
              videoId={this.state.videoId}
              videoIdHandler={this.updateVideoId}
              videoIdError={this.state.videoIdError}
            />
            <YoutubeWrapper>
              <YoutubeEmbed 
                videoId={this.state.videoId} 
                progressHandler={this.updateProgress}
                playbackSpeed={this.state.playbackSpeed}
                playbackSpeedHandler={this.updatePlaybackSpeed}
              />
              <ChordDiagramsCarousel 
                chords={this.state.songData.song_events}
                chordsData={this.state.chordsData}
                currentChordIndex={this.state.currentChordIndex}
              />
            </YoutubeWrapper>
            {
              !this.state.loadingSong ?
                <ChordsTrack
                  chords={this.state.songData.song_events}
                  currentTime={this.state.currentTime}
                  percentagePlayed={this.state.percentagePlayed}
                  currentChordIndexHandler={this.updateCurrentChordIndex}
                  currentChordIndex={this.state.currentChordIndex}
                />
              : null
            }
          </StyledAppContainerInner>
          : null
        }
        <Loader loading={this.state.loadingApp || this.state.loadingSong}/>
      </StyledAppContainer>
    )
  }
}

export default AppContainer