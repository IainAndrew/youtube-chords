import React, {Component} from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'

const StyledYoutube = styled(YouTube)`
  display:block;
`

class YoutubeEmbed extends Component {
  onReady = (e) => {
    // e.target.playVideo()
    e.target.mute()
    // e.target.setPlaybackRate(0.5)
  }
  render() {
    const options = {
      height: '100%',
      width: '100%'
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