import React from 'react';

function ActionsView(props) {
    return(
        <div className="container content">
            <aside>
                <form>
                    <div className="form-group row">
                    <label className="col-md-1 col-form-label">Sorteer:</label>
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => props.sort(e)}>
                                <option>Hal</option>
                                <option>Type</option>
                                <option>Datum</option>
                            </select>
                        </div>
                    </div>

                </form>
            </aside>

            <table className="table table-responsive">
                <thead className="thead-inverse">
                <tr>
                    <th><button className="sortButton" name="Hal" value="Hal" onClick={(e) => props.sort(e)}>Hal &or;</button></th>
                    <th><button className="sortButton" name="Type" value="Type" onClick={(e) => props.sort(e)}>Type &or;</button></th>
                    <th><button className="sortButton" name="Datum" value="Datum" onClick={(e) => props.sort(e)}>Datum &or;</button></th>
                    <th>Omschrijving</th>
                </tr>
                </thead>
                <tbody>
                {props.actions.map((action, i) =>
                        <tr className={action.type} key={i}>
                            <td>{action.hall}</td>
                            <td>{action.datum}</td>
                            <td>{action.type}</td>
                            <td>{action.omschrijving}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ActionsView;