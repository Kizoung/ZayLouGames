import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import MenuControls from './components/MenuControls';
import Grille from './components/Grille'
import  LoginScreen  from './components/LoginScreen'


//import './styles/App.css';

function App() {
  return (
    <>
      <Header />
      <MenuControls />
      <Grille />
      <LoginScreen/>
    </>
  );
}

export default App;