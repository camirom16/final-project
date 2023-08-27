import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styling/App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App-container">
        {/* GlobalStyles */}
        <Header />

        <div className="App-content">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<h1>About</h1>} />
            <Route path='/how-it-works' element={<h1>How</h1>} />
            <Route path='/ressources' element={<h1>Ressources</h1>} />
            <Route path='/new-account' element={<h1>New account</h1>} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile/:profileId' element={<h1>Profile</h1>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
};

export default App;