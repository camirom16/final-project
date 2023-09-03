import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styling/App.css';
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/HomePage";
import NewAccount from "./components/account/NewAccount";
import Login from "./components/account/Login";
import Error from "./components/home/Error";
import GlobalStyles from "./styling/GlobalStyles";
import ConfirmationAccount from "./components/account/ConfirmationAccount";
import Profile from "./components/profile/Profile";
import UpdateAccount from "./components/profile/UpdateAccount";
import Delete from "./components/profile/Delete";
import NHSWidget from "./components/home/Ressources";
import Symptom from "./components/consultation/Symptom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-container">
        <GlobalStyles />
        <Header />

        <div className="App-content">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/ressources' element={<NHSWidget />} />
            <Route path='/new-account' element={<NewAccount />} />
            <Route path='/account/:accountId' element={<ConfirmationAccount />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:profileId' element={<Profile />} />
            <Route path='/profile/:profileId/settings' element={<UpdateAccount />} />
            <Route path='/profile/:profileId/delete' element={<Delete />} />
            <Route path="/symptom/:symptom" element={<Symptom />} />
            <Route path='*' element={<Error />} />
            
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
};

export default App;