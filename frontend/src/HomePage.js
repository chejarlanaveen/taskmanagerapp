import MenuAppBar from './AppBarComp.js';
import CustomTabPanel from './Tabswitch.js';
import LoginPage from './loginpageInterface.js';
//import Footer from './footercomp.js';

function Mainapp() {
  return (
    <div className="App">
      <MenuAppBar/>
      <CustomTabPanel/>
      {/*<Footer/>*/}
    </div>

  );
}

export default Mainapp;