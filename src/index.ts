import { Widget } from './components/widget/widget';

import './style.scss';

window.onload = () => {
  const body = document.querySelector('body');
  if (!body) throw Error('body not found');
  const widget = () => new Widget(body);
  widget();
};
