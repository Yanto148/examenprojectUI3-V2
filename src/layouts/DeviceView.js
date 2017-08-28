import React from 'react';
import { Link } from 'react-router';

class DeviceView extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="container content">
                    <Link className="btn btn-primary btn-sm" to={'/hall/' + this.props.hallId}>&lt;- Back</Link>
                    <h2 className="formTitle"><img src={this.props.icon} alt=""/> Hal {this.props.hallId} - Apparaat {this.props.id}</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Id:</label>
                            <div className="col-sm-10">
                                <input type="text" id="id" className="form-control readonly" readonly value={this.props.id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Categorie:</label>
                            <div className="col-sm-10">
                                <input type="text" id="id" className="form-control readonly" readonly value={this.props.categorie}/>
                            </div>
                        </div>
                        <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Naam:</label>
                            <div className="col-sm-10">
                                <input id="name" name="name" type="text" className="form-control" value={this.props.name} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.nameMsg}</p>
                    </form>
                    <h2 className="formTitle">Laatst uitgevoerde actie:</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Datum:</label>
                            <div className="col-sm-10">
                                <input id="lastCompletedActionDate" name="lastCompletedActionDate" type="text" className="form-control" value={this.props.lastCompletedActionDate} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.dateMsgLastAction}</p>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Type:</label>
                            <div className="col-sm-10">
                                <select value={this.props.lastCompletedActionType} name="lastCompletedActionType" className="form-control" onChange={(e) => this.props.handleChange(e)}>
                                    <option value="vervanging">Vervanging</option>
                                    <option value="nazicht">Nazicht</option>
                                </select>
                            </div>
                        </div>
                        <p className="invalid">{this.props.typeMsgLastAction}</p>
                        <div className="form-group">
                            <label>Omschrijving:</label>
                            <textarea id="lastCompletedActionDescription" name="lastCompletedActionDescription" className="form-control" value={this.props.lastCompletedActionDescription} onChange={(e) => this.props.handleChange(e)}/>
                        </div>
                    </form>
                        <h2 className="formTitle">Eerstvolgende actie:</h2>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Datum:</label>
                            <div className="col-sm-10">
                                <input id="upcomingActionDate" name="upcomingActionDate" type="text" className="form-control" value={this.props.upcomingActionDate} onChange={(e) => this.props.handleChange(e)}/>
                            </div>
                        </div>
                        <p className="invalid">{this.props.dateMsgUpcomingAction}</p>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Type:</label>
                            <div className="col-sm-10">
                                <select value={this.props.upcomingActionType} name="upcomingActionType" className="form-control" onChange={(e) => this.props.handleChange(e)}>
                                    <option value="vervanging">Vervanging</option>
                                    <option value="nazicht">Nazicht</option>
                                </select>
                            </div>
                        </div>
                        <p className="invalid">{this.props.typeMsgUpcomingAction}</p>
                        <div className="form-group">
                            <label>Omschrijving:</label>
                            <textarea id="upcomingActionDescription" name="upcomingActionDescription" className="form-control" value={this.props.upcomingActionDescription} onChange={(e) => this.props.handleChange(e)}/>
                        </div>
                        <div style={{textAlign: "left"}}>
                            <button className="btn btn-primary d-inline formButton" id="button" onClick={(e) => this.props.actionCompleted(e)}>Actie uitgevoerd</button>
                            <button className="btn btn-primary d-inline formButton" id="button" type="button" onClick={(e) => this.props.validateForm(e)}>Verzenden</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default DeviceView;