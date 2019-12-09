import { COLORS, FINISHING } from './styles';

const SCALE = 3.8;
const POSITION_Y = -6;
const POSITION_X = -16;

const PARTS = {
  small_finger: {
    id: 1,
    name: 'Small finger',
    path: 'small_finger',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  finger: {
    id: 2,
    name: 'Finger',
    path: 'finger',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  wrist: {
    id: 3,
    name: 'Wrist',
    path: 'wrist',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  body_upper: {
    id: 4,
    name: 'Body Upper',
    path: 'body_upper',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  body: {
    id: 5,
    name: 'Body',
    path: 'body',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  button: {
    id: 6,
    name: 'Button',
    path: 'button',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
}

export default PARTS;
