import React from 'react'
import { expect } from 'chai'
import { configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Chord from '../components/Chord'

configure({ adapter: new Adapter() })

const chord = {
  beat_time: 15.6229,
  duration: 2.9489,
  name: "D",
  voicing: "open"
}
const chordWithCapo = {
  beat_time: 15.6229,
  duration: 2.9489,
  name: "D",
  capoName: "E",
  voicing: "open"
}

describe('<Chord/>', () => {
  it("renders a div with style 'width:295px' and text 'D'", () => {
    const wrapper = render(<Chord chord={chord}/>)
    expect(wrapper[0].attribs.style).to.equal('width:295px')
    expect(wrapper[0].children[0].data).to.equal('D')
  })
})

describe('<Chord/>', () => {
  it("renders a div with text 'E'", () => {
    const wrapper = render(<Chord chord={chordWithCapo}/>)
    expect(wrapper[0].children[0].data).to.equal('E')
  })
})