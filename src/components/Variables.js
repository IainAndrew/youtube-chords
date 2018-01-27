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
    return `linear-gradient(${this.primary}, ${darken(0.2, this.primary)})`
  },
  get secondaryGradient() {
    return `linear-gradient(${this.secondary}, ${darken(0.2, this.secondary)})`
  }
}