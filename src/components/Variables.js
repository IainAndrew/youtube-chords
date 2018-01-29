import {darken} from 'polished'

export const colors = {
  purple: '#5444d2',
  orange: '#f28658',
  lightgrey: '#f0f3f7',
  white: '#ffffff',
  grey:'#464646',
  get primary() {
    return this.purple;
  },
  get secondary() {
    return this.orange;
  },
  get bodyFont() {
    return this.grey;
  },
  get primaryGradient() {
    return `linear-gradient(${this.primary}, ${darken(0.1, this.primary)})`
  },
  get secondaryGradient() {
    return `linear-gradient(${this.secondary}, ${darken(0.1, this.secondary)})`
  }
}

export const breakpoints = {
  small: '0',
  smallMedium: '30.063em',
  medium: '40.063em',
  large: '64.063em',
  xlarge: '90.063em',
  xxlarge: '120.063em'
}