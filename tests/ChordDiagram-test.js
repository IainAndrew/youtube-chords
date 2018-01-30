import React from 'react'
import { expect } from 'chai'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ChordDiagram from '../src/components/ChordDiagram'

configure({ adapter: new Adapter() })

const chord = {
  capo:["D","C#","C","B","A#","A","G#","G","F#","F","E","D#"],
  extra_params: {},
  fingers:["x","x","0","1","3","2"],
  flat_name:"D",
  fret:1,
  id:"96c6515e-8c34-4b64-b254-b1db9165c130",
  instrument:"Guitar",
  name:"D",
  root:"D",
  shape:["x","x","0","2","3","2"],
  sharp_name:"D",
  tuning:["e","a","d","g","b","e"],
  tuning_name:"standard",
  type:"major",
  voicing:"open"
}

describe('<ChordDiagram/>', () => {
  it('renders a div', () => {
    const wrapper = shallow(<ChordDiagram chord={chord}/>)
    expect(wrapper).to.have.length(1)
  })
})