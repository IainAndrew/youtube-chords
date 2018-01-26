import React, {Component} from 'react'
import YouTube from 'react-youtube'

class YoutubeEmbed extends Component {
  render() {
    const options = {
      height: '390',
      width: '100%',
    }
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={options}
        onStateChange={this.props.progressHandler}
      />
    )
  }
}

export default YoutubeEmbed