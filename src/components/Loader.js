import React, {Component} from 'react'
import styled from 'styled-components'
import {colors} from './Variables'
import {fadeIn, fadeOut} from './Animations'
import {darken} from 'polished'

const StyledLoader = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background:${colors.primaryGradient};
  color:${colors.white};
  animation:${props => props.loading ? null : `${fadeOut} 1s ease forwards 1s`};
  display:flex;
  justify-content:center;
  align-items:center;
`

const Loader = (props) => {
  return (
    <StyledLoader loading={props.loading} className={props.loading ? 'loading' : null}>Loading...</StyledLoader>
  )
}

export default Loader