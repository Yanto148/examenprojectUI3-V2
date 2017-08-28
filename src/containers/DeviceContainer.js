import React from 'react';
import * as HallService from '../service/HallService';
import * as Utils from '../service/Utils';
import DeviceView from '../layouts/DeviceView';

class DeviceContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hallId: this.props.params.hallId,
            id: '',
            categorie: '',
            icon: '',
            name: '',
            description: '',
            lastCompletedActionDate: '',
            lastCompletedActionType: '',
            lastCompletedActionDescription: '',
            upcomingActionDate: '',
            upcomingActionType: '',
            upcomingActionDescription: '',
            formValid: true,
            nameMsg: '',
            dateMsgLastAction: '',
            dateMsgUpcomingAction: '',
            typeMsgLastAction: '',
            typeMsgUpcomingAction: ''
        };
    }

    componentDidMount()
    {
        HallService.getHallFromBackend(this.props.params.hallId)
            .then((hall) => {
                hall.apparaten.forEach((device) => {
                    if (device.id == this.props.params.deviceId)
                    {
                        this.setState({id: device.id});
                        this.setState({categorie: device.categorie});
                        this.setState({name: device.naam});
                        this.setState({description: device.omschrijving});
                        this.setState({lastCompletedActionDate: device.laatstUitgevoerdeActie.datum});
                        this.setState({lastCompletedActionType: device.laatstUitgevoerdeActie.type});
                        this.setState({lastCompletedActionDescription: device.laatstUitgevoerdeActie.omschrijving});
                        this.setState({upcomingActionDate: device.eerstVolgendeActie.datum});
                        this.setState({upcomingActionType: device.eerstVolgendeActie.type});
                        this.setState({upcomingActionDescription: device.eerstVolgendeActie.omschrijving});
                    }
                });
            })
            .then(() => this.setIcon());
    }

    setIcon()
    {
        let device = this.state;
        device.eerstVolgendeActie = {};
        device.eerstVolgendeActie.datum = this.state.upcomingActionDate;

        if (this.state.categorie === 'machine' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/conveyor.png'});
        }
        else if (this.state.categorie === 'machine' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/conveyor-red.png'});
        }
        else if (this.state.categorie === 'lamp' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/small-light-bulb.png'});
        }
        else if (this.state.categorie === 'lamp' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/small-light-bulb-red.png'});
        }
        else if (this.state.categorie === 'band' && !Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/assembly-line.png'});
        }
        else if (this.state.categorie === 'band' && Utils.checkIfNextActionIn24Hours(device))
        {
            this.setState({icon: '../../assets/icons/assembly-line-red.png'});
        }
    }

    // Vangt veranderingen in het formulier op en toont ze op het scherm
    handleChange(event)
    {
        this.setState({[event.target.name] : event.target.value});
    }

    actionCompleted(event)
    {
        event.preventDefault();
        const upcomingActionDate = this.state.upcomingActionDate;
        const upcomingActionType = this.state.upcomingActionType;
        const upcomingActionDescription = this.state.upcomingActionDescription;
        this.setState({lastCompletedActionDate : upcomingActionDate});
        this.setState({lastCompletedActionType : upcomingActionType});
        this.setState({lastCompletedActionDescription : upcomingActionDescription});
    }

    // Bij submit wordt deze methode gecalled, handleSubmit wordt enkel gecalled als alle velden geldig zijn
    validateForm(event)
    {
        event.preventDefault();
        this.clearErrorMessages();
        let regexp = new RegExp("^[0-9]?[0-9]\/[0-9]?[0-9]\/[0-9][0-9][0-9][0-9]$");

        if (this.state.name.length > 100 || this.state.name === '')
        {
            this.setState({nameMsg: 'Verplicht veld, mag niet meer dan 100 karakters bevatten'});
            this.setState({formValid: false});
        }
        else if (!regexp.test(this.state.lastCompletedActionDate))
        {
            this.setState({dateMsgLastAction: 'Datum moet van dd/mm/yyyy formaat zijn', formValid: false});
            this.setState({formValid: false});
        }
        else if (!regexp.test(this.state.upcomingActionDate))
        {
            this.setState({dateMsgUpcomingAction: 'Datum moet van dd/mm/yyyy formaat zijn'});
            this.setState({formValid: false});
        }
        else
        {
            this.setState({formValid: true});
            this.clearErrorMessages();
            this.handleSubmit();
        }
    }

    clearErrorMessages()
    {
        this.setState({dateMsgLastAction: ''});
        this.setState({dateMsgUpcomingAction: ''});
        this.setState({typeMsgLastAction: ''});
        this.setState({typeMsgUpcomingAction: ''});
    }

    // Wordt enkel gecalled in de validateForm method indien alle velden geldig zijn
    handleSubmit()
    {
        const payload = {
            id: this.state.id,
            categorie: this.state.categorie,
            naam: this.state.name,
            description: this.state.description,
            laatstUitgevoerdeActie: {
                datum: this.state.lastCompletedActionDate,
                type: this.state.lastCompletedActionType,
                description: this.state.lastCompletedActionDescription
            },
            eerstVolgendeActie: {
                datum: this.state.upcomingActionDate,
                type: this.state.upcomingActionType,
                description: this.state.upcomingActionDescription
            }
        };

        const url = 'http://localhost:4200/hal/' + this.props.params.hallId + '/apparaat/' + this.state.id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(() => this.props.router.push('/hall/' + this.props.params.hallId))
            .catch((err) => console.log(err));
    }

    render()
    {
        return <DeviceView
            {...this.state}
            actionCompleted={(e) => this.actionCompleted(e)}
            handleChange={(e) => this.handleChange(e)}
            validateForm = {(e) => this.validateForm(e)}
            handleSubmit = {(e) => this.handleSubmit(e)}
        />
    }
}

export default DeviceContainer;