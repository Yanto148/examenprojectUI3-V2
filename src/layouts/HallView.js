import React from 'react';
import { Link } from 'react-router';

class HallView extends React.Component{
    render()
    {
        return(
            <div>
                <div className="buttonWrapper">
                    <button id="button" className="btn btn-primary btn-danger button" onClick={(hallId) => this.props.fireAlarm(this.props.hallInfo.id)}>Alarm!</button>
                </div>
                <div className="hallDetail" style={this.props.style}>
                    {this.props.hallInfo.naam}
                    {this.props.devices.map(device => {
                        let style = {
                            left: device.x,
                            top: device.y,
                            position: "absolute"
                        };
                        return (
                            <div key={device.id} style={style}>
                                <Link to={'/hall/' + this.props.hallInfo.id + '/apparaat/' + device.id}><img src={device.imageSrc} alt=""/></Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default HallView;