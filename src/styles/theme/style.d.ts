import 'styled-components';
import {ColorsType, DeviceType, TextsType} from './Theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType;
    texts: TextsType;
    device: DeviceType;
  }
}
