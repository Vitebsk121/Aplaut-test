import './widget.scss';

import { getWidget } from '../../shared/server';
import { BaseComponent } from '../baseComponent';

export class Widget {

    constructor(rootElement: HTMLElement) {



        getWidget(['page=1', 'per_page=15']).then((data) => {
            console.log(data);
        });

        this.render(rootElement);
    }


    render(rootElement: HTMLElement) {

        const widget = new BaseComponent('div', ['widget__wrapper']);

        rootElement.append(widget.element);

        
    }
}