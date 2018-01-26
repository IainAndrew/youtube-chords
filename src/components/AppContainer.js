import React, {Component} from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import SongDataApi from './api/SongDataApi'
import ChordsApi from './api/ChordsApi'
import YoutubeEmbed from './YoutubeEmbed'
import ChordsTrack from './ChordsTrack'
import ChordDiagram from './ChordDiagram'

let progressInterval

class AppContainer extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      videoId: 'oKsxPW6i3pM',
      songData: null,
      chordsData: null,
      percentagePlayed: null,
      currentChord: 'D'
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
        const percentagePlayed = (playerCurrentTime / playerTotalTime) * 100
        this.setState({percentagePlayed})
      }, 50)
    } else {
      clearInterval(progressInterval);
    }
  }

  render() {
    return (
      <div>
        {
          this.state.songData ?
            <ChordsTrack chords={this.state.songData.song_events} percentagePlayed={this.state.percentagePlayed}/>
          : <p>loading...</p>
        }
        <YoutubeEmbed videoId={this.state.videoId} progressHandler={this.updateProgress}/>
        {
          this.state.chordsData ?
            <ChordDiagram chord={this.state.currentChord} chordsData={this.state.chordsData}/>
          : null
        }
      </div>
    )
  }
}

export default AppContainer