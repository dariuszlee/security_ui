import * as React from "react";
import Draggable from 'react-draggable';

export class AppToolBar extends React.Component {
    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };
    render() {
        return (
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <AppToolBarInternal />
            </Draggable>
        );
    }
}

class AppToolBarInternal extends React.Component {
    render() {
        return (
            <div id="app_toolbar">
                <div id="app_toolbar_header">
                    <i className='fa fa-greater-than'></i>
                </div>
                <div className="handle">Drag from here</div>
                <div>This readme is really dragging on...</div>
            </div>
        );
    }
}
