import React, {Component} from 'react'
import styled from 'styled-components'
import {colors, breakpoints} from './Variables'
import {darken} from 'polished'
import ToolbarCapo from './ToolbarCapo'
import ToolbarPlaybackSpeed from './ToolbarPlaybackSpeed'
import ToolbarVideoId from './ToolbarVideoId'
import ToolbarChords from './ToolbarChords'

const StyledToolbar = styled.div`
  position:relative;
  width:100%;
  color:${colors.white};
`
const ToolbarList = styled.ul`
  margin:0;
  list-style:none;
  width:100%;
  display:${props => props.showing ? 'block' : 'none'};
  @media (min-width:${breakpoints.medium}) {
    display:flex;
  }
  li {
    flex:1;
    background:${colors.primaryGradient};
    @media (min-width:${breakpoints.medium}) {
      flex:1;
    }
    &:not(:last-child) {
      border-right:1px solid ${darken(0.2, colors.primary)};
    }
  }
`
const ToolbarToggleBar = styled.div`
  position:relative;
  width:100%;
  background:${colors.primaryGradient};
  text-align:right;
  @media (min-width:${breakpoints.medium}) {
    display:none;
  }
  a {
    padding:1rem;
    display:inline-block;
    line-height:1;
    color:inherit;
    &:after {
      content:"\\025BE";
      transform:${props => props.showing ? 'rotate(180deg)' : 'none'};
      display:inline-block;
      margin-left:0.2rem;
    }
  }
`

class Toolbar extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      toolbarShowing: false
    }
  }

  toggleToolbar = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      toolbarShowing: !prevState.toolbarShowing
    }))
  }

  render() {
    return (
      <StyledToolbar>
        <ToolbarToggleBar>
          <a href="#" onClick={this.toggleToolbar}>Tools</a>
        </ToolbarToggleBar>
        <ToolbarList showing={this.state.toolbarShowing}>
          <ToolbarCapo capo={this.props.capo} capoHandler={this.props.capoHandler}/>
          <ToolbarPlaybackSpeed playbackSpeed={this.props.playbackSpeed} playbackSpeedHandler={this.props.playbackSpeedHandler} tempo={this.props.tempo}/>
          <ToolbarChords uniqueChords={this.props.uniqueChords} chordsData={this.props.chordsData}/>
          <ToolbarVideoId videoIdHandler={this.props.videoIdHandler} videoIdError={this.props.videoIdError}/>
        </ToolbarList>
      </StyledToolbar>
    )
  }
}

export default Toolbar