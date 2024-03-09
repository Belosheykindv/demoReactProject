import React from "react";
import ReactDOM from "react-dom";
import SamuraiJSAPP from "./AppAntD";

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJSAPP />, div)
    ReactDOM.unmountComponentAtNode(div)
})