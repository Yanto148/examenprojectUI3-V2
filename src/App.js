import React from 'react';
import { Link } from 'react-router';
import './App.css';
import DocumentMeta from 'react-document-meta';

class App extends React.Component {

    render() {

        // Voegt meta informatie toe aan de head van elke pagina
        const meta = {
            title: 'Factory',
            meta: {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }
        };

        return (
            <div>
                <DocumentMeta {...meta}/>
                <nav className="navbar navbar-light navbar-expand">
                    <div className="container" id="navigation">
                    <Link className="navbar-brand" to="/">Factory</Link>
                    <ul className="navbar-nav">
                         <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                         </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/acties">Eerstvolgende Acties</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    };
}

export default App;