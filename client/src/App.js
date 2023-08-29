import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styling/App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import NewAccount from "./components/NewAccount";
import Login from "./components/Login";
import Error from "./components/Error";
import GlobalStyles from "./styling/GlobalStyles";
import ConfirmationAccount from "./components/ConfirmationAccount";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-container">
        <GlobalStyles />
        <Header />

        <div className="App-content">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/new-account' element={<NewAccount />} />
            <Route path='/confirmation-account' element={<ConfirmationAccount />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:profileId' element={<h1>Profile</h1>} />
            <Route path='*' element={<Error />} />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
};

export default App;