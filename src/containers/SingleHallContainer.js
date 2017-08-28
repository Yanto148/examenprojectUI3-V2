import React from 'react';
import * as HallenService from "../service/HallService";
import Hall from '../layouts/HallView';
import * as Utils from '../service/Utils';

class HallContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallInfo: {},
            apparaten: [],
            devices: [],
            style: {},
            alarm: false,
        }
    }

    componentDidMount()
    {
        HallenService.getHallFromBackend(this.props.params.hallId)
            .then((hall) => {
                this.setState({hallInfo: hall});
                return hall;
            })
            .then((hall) => {
                this.setStyle(hall, '#E1E1E1');
                return hall;
            })
            .then((hall) => this.setDevices(hall))
            .then(() => this.setImgSrc());
    }

    setStyle(hall, backgroundColor)
    {
        let style;
        let width = hall.width.split("px")[0] * 2;
        let height = hall.height.split("px")[0] * 2;

        this.setState({backgroundColor: backgroundColor}, function () {
            style = {
                width: width,
                height: height,
                backgroundColor: this.state.backgroundColor
            };

            this.setState({style: style});
        })
    }

    setDevices(hall)
    {
        hall.apparaten.forEach((device) =>
        {
            this.setState((prevState, props) => {this.state.devices.push(device)});
        });
    }

    setImgSrc()
    {
        this.setState((prevState, props) =>
            this.state.devices.map((device, i) => {
                if (device.categorie === 'machine' && !Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/conveyor.png";
                    return device;
                }
                else if (device.categorie === 'machine' && Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/conveyor-red.png";
                    return device;
                }
                else if (device.categorie === 'lamp' && !Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/small-light-bulb.png";
                    return device;
                }
                else if (device.categorie === 'lamp' && Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/small-light-bulb-red.png";
                    return device;
                }
                else if (device.categorie === 'band' && !Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/assembly-line.png";
                    return device;
                }
                else if (device.categorie === 'band' && Utils.checkIfNextActionIn24Hours(device))
                {
                    device.imageSrc = "../../assets/icons/assembly-line-red.png";
                    return device;
                }
                return device;
            })
        );
    }

    fireAlarm(id)
    {
        clearInterval(this.intervall);
        let backgroundColor = '';
        this.setState({alarm: !this.state.alarm},
            function(){
                // Indien het alarm is aangezet moet het pulseren starten door styles te switchen met een timer
                if (this.state.alarm)
                {
                    let backgroundSwitcher = false;
                    this.intervall = setInterval(() => {
                        if (backgroundSwitcher)
                            backgroundColor = '#E1E1E1';
                        else
                            backgroundColor = 'orange';
                        this.setStyle(this.state.hallInfo, backgroundColor);
                        backgroundSwitcher = !backgroundSwitcher
                    }, 1000)
                }

                // Als het alarm is uitgezet moet de originele style worden teruggezet
                else
                {
                    this.setStyle(this.state.hallInfo, '#E1E1E1');
                }
            });
    }

    render()
    {
        return(
          <Hall {...this.state } fireAlarm={(id) => this.fireAlarm(id)}/>
        );
    }
}

export default HallContainer;
