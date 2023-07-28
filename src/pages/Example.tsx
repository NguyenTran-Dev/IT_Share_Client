import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../logo.svg';
import { hello } from '../reducers/exampleReducer';
import { RootState } from '../store/store';

const Example = () => {
  const helloMsg = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Welcome to React</h1>
        <h3>{helloMsg}</h3>
        <p>
          Edit <code>src/pages/Example.tsx</code> and save to reload.
        </p>
        <div>
          <a
            className="button"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <a href="#" className="button" onClick={() => dispatch(hello())}>
            Say Hello
          </a>
        </div>
      </header>
    </div>
  );
};

export default Example;
