import styled from 'styled-components'
import {colors, breakpoints} from './Variables'
import {darken} from 'polished'

const ToolbarTool = styled.li`
  position:relative;
  flex:1;
  background:${colors.primaryGradient};
  padding:1rem;
  &:not(:last-child) {
    border-right:1px solid ${darken(0.2, colors.primary)};
  }
  @media (min-width:${breakpoints.medium}) {
    display:flex;
    flex-direction:column;
    justify-content:center;
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
  }
`

export default ToolbarTool