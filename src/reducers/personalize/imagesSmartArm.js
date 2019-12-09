import { COLORS, FINISHING } from './styles';

const SCALE = 3.5;
const POSITION_Y = -6;
const POSITION_X = -12;


const PARTS = {
  finger_small: {
    id: 1,
    name: 'Finger small',
    path: 'finger_small',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  fingers_big: {
    id: 2,
    name: 'Fingers big',
    path: 'fingers_big',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  wristlet: {
    id: 3,
    name: 'Wristlet',
    path: 'wristlet',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  forearm_small: {
    id: 4,
    name: 'Forearm small',
    path: 'forearm_small',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  forearm_big: {
    id: 5,
    name: 'Forearm big',
    path: 'forearm_big',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  button_small: {
    id: 6,
    name: 'Button small',
    path: 'button_small',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  body: {
    id: 7,
    name: 'Body',
    path: 'body',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  },
  // ring_top: {
  //   id: 8,
  //   name: 'Ring top',
  //   path: 'ring_top',
  //   x: SCALE * 1 + POSITION_X,
  //   y: SCALE * 1 + POSITION_Y,
  //   width: SCALE * 20,
  //   label: 'Hand',
  //   selectedColor: COLORS.white,
  //   selectedFinishing: FINISHING.matt,
  // },
  button_big: {
    id: 9,
    name: 'Button big',
    path: 'button_big',
    x: SCALE * 1 + POSITION_X,
    y: SCALE * 1 + POSITION_Y,
    width: SCALE * 20,
    label: 'Hand',
    selectedColor: COLORS.white,
    selectedFinishing: FINISHING.matt,
  }
}

export default PARTS;
