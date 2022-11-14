import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { Container, Row, Col } from 'react-bootstrap';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

//main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
