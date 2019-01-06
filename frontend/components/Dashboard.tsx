import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;

class App extends Component {
    state = {
        drawer: false,
        positionX: 50,
        positionY: 50,
        longTouch: false,
        addModal: false,
        addType: null,
        addForm: {},
        do1: [],
        do2: [],
        do3: [],
        do4: []
    }

    componentDidMount() {
    }

    render() {
        return (
            <Wrapper>
                dashboard
            </Wrapper>
        );
    }
}
export default App;
