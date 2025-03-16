import CurveIcon from '@components/Icons/Curve';
import Curve2Icon from '@components/Icons/Curve2';

const linear = [0.5, 0.5, 0.5, 0.5];

const easeInCubic = [0.55, 0.055, 0.675, 0.19];
const easeOutCubic = [0.215, 0.61, 0.355, 1];
const easeInOutCubic = [0.645, 0.045, 0.355, 1];

const easeInSine = [0.47, 0, 0.745, 0.715];
const easeOutSine = [0.39, 0.575, 0.565, 1];
const easeInOutSine = [0.445, 0.05, 0.55, 0.95];

const easeInQuad = [0.55, 0.085, 0.68, 0.53];
const easeOutQuad = [0.25, 0.46, 0.45, 0.94];
const easeInOutQuad = [0.455, 0.03, 0.515, 0.955];

const easeInQuart = [0.895, 0.03, 0.685, 0.22];
const easeOutQuart = [0.165, 0.84, 0.44, 1];
const easeInOutQuart = [0.77, 0, 0.175, 1];

const easeInQuint = [0.755, 0.05, 0.855, 0.06];
const easeOutQuint = [0.23, 1, 0.32, 1];
const easeInOutQuint = [0.86, 0, 0.07, 1];

// const easeInCirc = [0.6, 0.04, 0.98, 0.335];
// const easeOutCirc = [0.075, 0.82, 0.165, 1];
// const easeInOutCirc = [0.785, 0.135, 0.15, 0.86];

// const easeInExpo = [0.95, 0.05, 0.795, 0.035];
// const easeOutExpo = [0.19, 1, 0.22, 1];
// const easeInOutExpo = [1, 0, 0, 1];

// const easeInBack = [0.6, -0.28, 0.735, 0.045];
// const easeOutBack = [0.175, 0.885, 0.32, 1.275];
// const easeInOutBack = [0.68, -0.55, 0.265, 1.55];

export const curveStyles = {
  cubicBezier: {
    id: 'cubicBezier',
    label: 'Cubic Bezier',
    icon: <CurveIcon stroke="currentColor" />,
    enableConventional: true,
  },
  polyBezier: {
    id: 'polyBezier',
    label: 'Poly Bezier',
    icon: <Curve2Icon stroke="currentColor" />,
    enableConventional: true,
  },
  presets: {
    id: 'presets',
    label: 'Presets',
    icon: <CurveIcon stroke="currentColor" />,
    enableConventional: false,
  },
};

export const curvesTypes = {
  linear: {
    id: 'linear',
    label: 'Linear',
    subTypes: false,
  },
  cubic: {
    id: 'cubic',
    label: 'Cubic',
    subTypes: true,
  },
  quad: {
    id: 'quad',
    label: 'Quad',
    bezierFunction: [],
    subTypes: true,
  },
  quart: {
    id: 'quart',
    label: 'Quart',
    bezierFunction: [],
    subTypes: true,
  },
  quint: {
    id: 'quint',
    label: 'Quint',
    bezierFunction: [],
    subTypes: true,
  },
  sine: {
    id: 'sine',
    label: 'Sine',
    bezierFunction: [],
    subTypes: true,
  },
};

export const curveSubTypes = {
  easeIn: {
    id: 'easeIn',
    label: 'Ease In',
  },
  easeOut: {
    id: 'easeOut',
    label: 'Ease Out',
  },
  easeInOut: {
    id: 'easeInOut',
    label: 'Ease In Out',
  },
};

export const bezierFunctions = {
  linear,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
};
