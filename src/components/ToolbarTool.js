import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {darken} from 'polished'

const StyledToolbarTool = styled.li`
  position:relative;
  flex:1;
  background:${colors.primaryGradient};
  &:not(:last-child) {
    border-right:1px solid ${darken(0.2, colors.primary)};
  }
  a {
    padding:1rem 2rem;
    color:inherit;
    display:block;
    text-align:center;
  }
`
const ToolbarToolDropdown = styled.div`
  position:absolute;
  top:100%;
  padding:1rem;
  background:${colors.primary};
  min-width:100%;
  display:${props => props.open ? 'block' : 'none'};
`

class Toolbar extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleDropdown = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    return (
      <StyledToolbarTool>
        <a href="#" onClick={this.toggleDropdown}>{this.props.name}</a>
        <ToolbarToolDropdown open={this.state.open}>
          {this.props.children}
        </ToolbarToolDropdown>
      </StyledToolbarTool>
    )
  }
}

export default Toolbar