import React, {Component} from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import SongDataApi from './api/SongDataApi'
import ChordsApi from './api/ChordsApi'
import YoutubeEmbed from './YoutubeEmbed'
import ChordsTrack from './ChordsTrack'
import ChordDiagram from './ChordDiagram'
import UniqueChords from './UniqueChords'

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
      prevChordIndex: null,
      nextChordIndex: 1
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

  updateCurrentChordIndeces = (currentChordIndex, prevChordIndex, nextChordIndex) => {
    this.setState({
      currentChordIndex,
      prevChordIndex,
      nextChordIndex
    })
  }

  render() {
    return (
      <div>
        {
          this.state.songData && this.state.chordsData ?
            <div>
              <ChordsTrack chords={this.state.songData.song_events} currentTime={this.state.currentTime} percentagePlayed={this.state.percentagePlayed} currentChordIndecesHandler={this.updateCurrentChordIndeces}/>
              <UniqueChords chords={this.state.songData.unique_chords} chordsData={this.state.chordsData}/>
              <YoutubeEmbed videoId={this.state.videoId} progressHandler={this.updateProgress}/>
              <ChordDiagram chord={this.state.chordsData.find(chord => this.state.songData.song_events[this.state.prevChordIndex] && chord.name === this.state.songData.song_events[this.state.prevChordIndex].name)} status="previous"/>
              <ChordDiagram chord={this.state.chordsData.find(chord => this.state.songData.song_events[this.state.prevChordIndex] && chord.name === this.state.songData.song_events[this.state.currentChordIndex].name)} status="current"/>
              <ChordDiagram chord={this.state.chordsData.find(chord => this.state.songData.song_events[this.state.prevChordIndex] && chord.name === this.state.songData.song_events[this.state.nextChordIndex].name)} status="next"/>
            </div>
          : <p>loading...</p>
        }
      </div>
    )
  }
}

export default AppContainer