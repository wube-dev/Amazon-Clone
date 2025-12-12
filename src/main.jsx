import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {DataProvider} from './Components/DataProvider/DataProvider.jsx'
import App from './App.jsx'
import {reducer,intialState} from './Utility/reducer'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={intialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
