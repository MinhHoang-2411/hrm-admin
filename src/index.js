import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import {store} from 'app/store';
import {Provider} from 'react-redux';
import App from './App';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
