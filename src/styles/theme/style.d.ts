import 'styled-components';
import { ColorsType, TextsType } from './Theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType;
    texts: TextsType;
  }
}