import React, {Component} from 'react'
import styled from 'styled-components'
import SongDataApi from './api/SongDataApi'
import YoutubeEmbed from './YoutubeEmbed'
import ChordsTrack from './ChordsTrack'
import YouTube from 'react-youtube'

let progressInterval

class AppContainer extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      videoId: 'oKsxPW6i3pM',
      songData: null,
      percentagePlayed: null
    }
  }

  componentDidMount() {
    SongDataApi.getSongData(this.state.videoId).then(data => {
      this.setState({
        songData: data.song
      })
    }).catch(data => {
      console.log(data)
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
      </div>
    )
  }
}

export default AppContainer