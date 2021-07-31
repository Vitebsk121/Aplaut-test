import { getRequest } from '../../shared/server';
import './widget.scss';

export class Widget {
    constructor(body: HTMLElement) {
        body.append('tratata');

        getRequest().then((data) => {
            console.log(data);
        });
    }
}