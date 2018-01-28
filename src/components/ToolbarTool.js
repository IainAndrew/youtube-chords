import styled from 'styled-components'
import {colors} from './Variables'
import {darken} from 'polished'

const ToolbarTool = styled.li`
  position:relative;
  flex:1;
  background:${colors.primaryGradient};
  padding:1rem;
  text-align:center;
  &:not(:last-child) {
    border-right:1px solid ${darken(0.2, colors.primary)};
  }
  h6 {
    text-transform:uppercase;
    font-size:0.7em;
    color:inherit;
    text-align:left;
  }
  & > a {
    color:inherit;
    display:block;
    text-align:center;
  }
`

export default ToolbarTool