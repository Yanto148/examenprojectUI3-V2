import React from 'react';
import { Link } from 'react-router';
import '../App.css'

function PlattegrondView(props)
{
    return(
        <div>
            <div className="buttonWrapper">
                <button className="btn btn-primary button" onClick={() => props.switchLayout()}>Lijst</button>
                <button id="button" className="btn btn-primary btn-danger button" onClick={() => props.fireAlarm()}>Alarm!</button>
            </div>
            <div className="hallBlueprintContainer">
                {props.halls.map((hal, i) =>
                    <div className="hall" key={i} style={props.styles[i]}>
                        <p>{hal.naam}</p>
                        <p>Oppervlakte: {props.surfaces[i]} m²</p>
                        <p>Aantal apparaten: {props.amountOfDevices[i]}</p>
                        <p>Aantal uit te voeren acties: {props.amountOfActions[i]}</p>
                        <p><Link to={'/hall/' + hal.id}>Details</Link></p>
                        <button id="button" className="btn btn-primary btn-danger button" onClick={() => props.fireAlarmHall(i)}>Alarm!</button>
                    </div>
                    )}
                </div>
            </div>
        )
}

export default PlattegrondView;