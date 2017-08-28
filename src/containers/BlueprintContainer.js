import React from 'react';
import * as HallenService from "../service/HallService";
import Blueprint from '../layouts/BlueprintView';
import Lijst from '../layouts/ListView';
import * as Utils from '../service/Utils';

class PlattegrondContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            halls: [],
            styles: [],
            alarmsPerHall: [],
            surfaces: [],
            amountOfDevices: [],
            amountOfActions: [],
            activePage: 'Blueprint',
            alarm: false,
            backgroundSwitcher: false,
            windowWidth: 0
        };
    }

    componentDidMount()
    {
        HallenService.getHallsFromBackend()
            .then(halls => {this.setState({halls: halls})})
            .then(() => this.setStyles(this.state.halls, '#E1E1E1'))
            .then(() => this.setSurfaces(this.state.halls))
            .then(() => this.setAmountOfDevices(this.state.halls))
            .then(() => this.setAmountOfActions(this.state.halls))
            .then(() => this.setAlarmsPerHall(this.state.halls));

        // Voor het switchen naar list view op smartphones
        window.addEventListener("resize", (() => {
            this.setState({windowWidth : window.innerWidth});
        }));
    }

    setSurfaces(halls)
    {
        halls.forEach((hall) => {
            let width = hall.width.split("px");
            let height = hall.height.split("px");
            let surface = (width[0] * height[0]) / 100;
            this.setState((prevSate, props) => {this.state.surfaces.push(surface)});
        });
    }

    setAmountOfDevices(halls)
    {
        halls.forEach((hall) => {
            let amountOfDevices = hall.apparaten.length;
            this.setState((prevSatet, props) => this.state.amountOfDevices.push(amountOfDevices));
        });
    }

    setAmountOfActions(halls)
    {
        halls.forEach((hall) => {
            let amount = 0;
            hall.apparaten.forEach((device) => {
                if (Utils.checkIfNextActionIn24Hours(device))
                {
                    amount++;
                }
            });
            this.setState((prevSate, props) => {this.state.amountOfActions.push(amount)});
        });
    }

    setStyles(halls, backgroundColor)
    {
        let styles = [];
        this.setState({styles: styles}, function () {
            halls.forEach((hall) => {
                let style = {
                    left: hall.x,
                    top: hall.y,
                    width: hall.width,
                    height: hall.height,
                    backgroundColor: backgroundColor
                };
                this.setState((prevState, props) => {this.state.styles.push(style)});
            });
        });
    }

    setAlarmsPerHall(halls)
    {
        for(let i = 0; i < halls.length; i++)
        {
            let alarm = {
                index: i,
                alarm: false
            };
            this.setState((prevState, props) => {this.state.alarmsPerHall.push(alarm)});
        }
    }

    switchLayout()
    {
        if (this.state.activePage === 'Blueprint')
        {
            this.setState({activePage : 'List'});
        }
        else if (this.state.activePage === 'List')
        {
            this.setState({activePage : 'Blueprint'});
        }
    }

    fireAlarmHall(i)
    {
        clearInterval(this.intervalHall);

        const styles = this.state.styles;
        const style = styles[i];

        const alarms = this.state.alarmsPerHall;
        const alarmObject = alarms[i];

        alarmObject.alarm = !alarmObject.alarm;

        // Indien het alarm is aangezet moet het pulseren starten door styles te switchen met een timer
        if (alarmObject.alarm)
        {
            let backGroundSwitcher = false;
            this.intervalHall = setInterval(() => {
                if (backGroundSwitcher)
                {
                    style.backgroundColor = '#E1E1E1';
                }
                else
                {
                    style.backgroundColor = 'orange';
                }
                this.setState({styles: styles});
                backGroundSwitcher = !backGroundSwitcher;
            }, 1000);
        }

        // Als het alarm is uitgezet moet de originele style worden teruggezet
        else
        {
            style.backgroundColor = '#E1E1E1';
            this.setState({alarmsPerHall: alarms, styles: styles});
        }
    }

    fireAlarm()
    {
        let backgroundColor = '';

        clearInterval(this.interval);
        this.setState({alarm: !this.state.alarm}, function () {     // Callback die pas na het veranderen van de state gecalled mag worden
            // Indien het alarm is aangezet moet het pulseren starten door styles te switchen met een timer
            if (this.state.alarm)
            {
                this.interval = setInterval(() => {
                    if (this.state.backgroundSwitcher)
                        backgroundColor = '#E1E1E1';
                    else
                        backgroundColor = 'red';
                    this.setState({backgroundSwitcher: !this.state.backgroundSwitcher});
                    this.setStyles(this.state.halls, backgroundColor);
                }, 1000);
            }
            // Als het alarm is uitgezet moet de originele style worden teruggezet
            else
            {
                this.setStyles(this.state.halls, '#E1E1E1');
            }
        });
    }

    render() {
        let partial;
        let width = window.innerWidth;
        const breakpoint = 600;

        if (this.state.activePage === 'List' ||width < breakpoint)
        {
            partial = <Lijst {...this.state} switchLayout={() => this.switchLayout()}/>;
        }
        else if(this.state.activePage === 'Blueprint')
        {
            partial = <Blueprint {...this.state} switchLayout={() => this.switchLayout()} fireAlarm={() => this.fireAlarm()} fireAlarmHall = {(i) => this.fireAlarmHall(i)}/>;
        }


        return (
            <div>
                {partial}
            </div>
        );
    }
}

export default PlattegrondContainer;