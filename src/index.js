import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';
import { SnackbarProvider } from 'notistack';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';





ReactDOM.render(
    //<App />,
    <Router>
        <HttpsRedirect>
            <SnackbarProvider dense maxSnack={2}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}>
                <App/>
            </SnackbarProvider>
        </HttpsRedirect>
    </Router>,

    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
