import React, {Component} from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'

const StyledYoutube = styled(YouTube)`
  display:block;
`
let youtubeInstance
class YoutubeEmbed extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.playbackSpeed !== this.props.playbackSpeed) {
      youtubeInstance.setPlaybackRate(nextProps.playbackSpeed)
    }
  }
  onReady = (e) => {
    youtubeInstance = e.target
    e.target.playVideo()
    e.target.setPlaybackRate(this.props.playbackSpeed)
  }
  render() {
    const options = {
      height: '100%',
      width: '100%',
      playerVars: {
        modestbranding: 1,
        rel: 0
      }
    }
    return (
      <StyledYoutube
        videoId={this.props.videoId}
        opts={options}
        onReady={this.onReady}
        onStateChange={this.props.progressHandler}
      />
    )
  }
}

export default YoutubeEmbed