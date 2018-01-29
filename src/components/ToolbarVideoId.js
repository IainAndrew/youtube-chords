import React, {Component} from 'react'
import styled from 'styled-components'
import ToolbarTool from './ToolbarTool';

const VideoIdInput = styled.input`
  display:inline-block;
  margin:0;
  width:auto;
  margin-right:0.5rem;
`

class ToolbarVideoId extends Component {
  render() {
    return (
      <ToolbarTool>
        <h6>Change song</h6>
        <small>Enter a Youtube URL here</small>
        <form onSubmit={(e) => {e.preventDefault(); this.props.videoIdHandler(this.input.value)}}>
          <VideoIdInput type="text" innerRef={(input) => { this.input = input; }}/>
          <input type="submit" className="button tiny" value="Search" style={{margin:0}}/>
          {
            this.props.videoIdError ?
              <small>{this.props.videoIdError.message}</small>
            : null
          }
        </form>
      </ToolbarTool>
    )
  }
}

export default ToolbarVideoId