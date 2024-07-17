import {DefaultTheme} from 'styled-components';

const colors = {
  primary: '#a31432',
  secondary: '#334D61',
  neutral1: '#222',
  neutral2: '#333',
  neutral3: '#444',
  neutral4: '#777',
  neutral5: '#E8E8E8',
  neutral6: '#F7F7F7',
  blue: '#A9D0F5',
  black: '#000',
  white: '#FFF',
};

const texts = {
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    color: '#333',
  },
  menuTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#333',
  },
  content: {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: '#444',
  },
  warning: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#FAEBEE',
  },
  tapTitle: {
    fontSize: '1.3rem',
    fontWeight: '400',
    color: '#444',
  },
  tapTitleFocus: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#a31432',
  },
  tableTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#444',
  },
  loginContent: {
    fontSize: '1.35rem',
    fontWeight: '600',
    color: '#777',
  },
};

export type ColorsType = typeof colors;
export type TextsType = typeof texts;

export const theme: DefaultTheme = {
  colors,
  texts,
};
