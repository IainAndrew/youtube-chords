import React, {Component} from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import styled from 'styled-components'
import ChordDiagram from './ChordDiagram'
import {colors} from './Variables'

const ChordDiagramCarouselWrapper = styled.div`
  padding:4rem 1rem;
  max-width:60rem;
  margin:0 auto;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  pointer-events:none;
`
const ChordDiagramCarouselItem = styled.div`
  position:relative;
`

const ChordDiagramsCarousel = (props) => {
  return (
    <ChordDiagramCarouselWrapper>
      <Slider
        infinite={false}
        slidesToShow={3}
        slickGoTo={props.currentChordIndex - 1}
        lazyLoad={true}
        touchMove={false}
        draggable={false}
        arrows={false}
        initialSlide={0}
      >
        {
          props.chords.map((chord, i) => {
            return (
              <ChordDiagramCarouselItem key={chord.beat_time}>
                <ChordDiagram 
                  chord={props.chordsData.find(chordData => chordData.name === (chord.capoName || chord.name)) || chord}
                  isCurrent={i === props.currentChordIndex}
                />
              </ChordDiagramCarouselItem>
            )
          })
        }
      </Slider>
    </ChordDiagramCarouselWrapper>
  )
}

export default ChordDiagramsCarousel