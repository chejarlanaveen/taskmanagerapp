// import MenuAppBar from './AppBarComp.js';
// import CustomTabPanel from './Tabswitch.js';
// import LoginPage from './loginpageInterface.js';
// import Signup from './signuppage.js';


// function App() {
//   return (
//     <div className="App">
//       {/*<MenuAppBar/>
//       <CustomTabPanel/>
//       <LoginPage/>*/}
//       <Signup/>
//     </div>

//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signuppage';
import LoginPage from './loginpageInterface'; // The page to navigate to after signup
import Mainapp from './HomePage';
import Response from './response';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} /> {/* Redirect here after signup */}
        <Route path='/mainpage' element={<Mainapp/>}/>
        <Route path='/response' element={<Response/>}/>
      </Routes>
    </Router>
  );
};

export default App;




