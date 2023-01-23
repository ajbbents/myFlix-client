import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView from './components/main-view/main-view';
import { MovieCard } from './components/movie-card/movie-card';
import { Container, Row, Col } from 'react-bootstrap';

//import statement to indicate that you need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

//finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//tells react to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);
