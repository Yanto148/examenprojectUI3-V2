import React from 'react';
import { Link } from 'react-router';

class LijstView extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="buttonWrapper">
                    <button className="btn btn-primary button" onClick={(e) => this.props.switchLayout()}>Plattegrond</button>
                </div>
                <div className="hallsListView">
                    <ul>
                        {this.props.halls.map((hal, i) =>
                            <li key={i} className="hallsListItem">{hal.naam}
                                <ul className="hallName">
                                    <li>Oppervlakte: {this.props.surfaces[i]} m²</li>
                                    <li>Aantal apparaten: {this.props.amountOfDevices[i]}</li>
                                    <li>Aantal uit te voeren acties: {this.props.amountOfActions[i]}</li>
                                    <li><Link to={'/hall/' + hal.id}>Details</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default LijstView;