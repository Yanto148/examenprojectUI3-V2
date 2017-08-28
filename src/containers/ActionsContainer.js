import React from 'react';
import * as HallsService from "../service/HallService";
import ActionsView from '../layouts/ActionsView';

class ActionsContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            actions: []
        }
    }

    componentDidMount()
    {
        let actions = [];
        let hallsResult;
        // Haalt alle hallen op en loopt vervolgens over elk apparaat van elke hal om zo alle apparaten op te halen
        HallsService.getHallsFromBackend()
            .then((halls) => {
                hallsResult = halls
        })
            .then(() => {
                hallsResult.forEach((hall) => {
                    hall.apparaten.forEach((device) => {
                        let action = {
                            hall: hall.naam,
                            datum: device.eerstVolgendeActie.datum,
                            omschrijving: device.eerstVolgendeActie.omschrijving,
                            type: device.eerstVolgendeActie.type
                        };
                        actions.push(action);
                    })
                })
            })
            .then(() => this.setState({actions: actions}));
    }

    sort(event)
    {
        let actions = this.state.actions;
        if (event.target.value === 'Hal')
            actions.sort(this.compareHall);
        if (event.target.value === 'Datum')
            actions.sort(this.compareDate);
        if (event.target.value === 'Type')
            actions.sort(this.compareType);

        this.setState({actions: actions});

    }

    compareType(a, b)
    {
        if (a.type < b.type)
            return -1;
        if (a.type > b.type)
            return 1;
        return 0;
    }

    compareHall(a, b)
    {
        let numberA = a.hall.split(' ')[1];
        let numberB = b.hall.split(' ')[1];

        if (numberA < numberB )
            return -1;
        if (numberA > numberB )
            return 1;
        return 0;
    }

    compareDate(a, b)
    {
        let partsDatumA = a.datum.split('/');
        let partsDatumB = b.datum.split('/');

        if (partsDatumA[2] < partsDatumB[2])
            return -1;
        if (partsDatumA[2] > partsDatumB[2])
            return 1;
        else
        {
            if (partsDatumA[1] < partsDatumB[1])
                return -1;
            if (partsDatumA[1] > partsDatumB[1])
                return 1;
            else
            {
                if (partsDatumA[0] < partsDatumB[0])
                    return -1;
                if (partsDatumA[0] > partsDatumB[0])
                    return 1;
            }
        }
    }

    render()
    {
        return <ActionsView {...this.state} sort ={(e) => this.sort(e)}/>
    }
}

export default ActionsContainer;
