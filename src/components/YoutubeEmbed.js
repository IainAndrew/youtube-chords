import React, {Component} from 'react'
import YouTube from 'react-youtube'

class YoutubeEmbed extends Component {
  onReady = (e) => {
    // e.target.playVideo()
    // e.target.mute()
    // e.target.setPlaybackRate(0.5)
    var totalLength = 0
  }

  render() {
    const options = {
      height: '390',
      width: '100%',
    }
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={options}
        onReady={this.onReady}
        onStateChange={this.props.progressHandler}
      />
    )
  }
}

export default YoutubeEmbed