import React, {Component} from 'react'
import axios from "axios";


export default class Dashboard extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {

        };
    }



    componentDidMount() {
        this._isMounted = true;
        this.axiosCancelSource = axios.CancelToken.source();

        document.title = "Dashboard";
        document.body.style.backgroundColor = "#F4F5F8";

    }

    componentWillUnmount() {
        this._isMounted = false;
        this.axiosCancelSource.cancel('Cancel request.');

        document.body.style.backgroundColor = "initial";
    }



    render() {
        return (
            <>
                <main id="main-content">
                    <h4>Welcome to dashboard</h4>
                </main>
            </>
        )
    }
}
