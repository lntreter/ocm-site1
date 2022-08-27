import './App.css';
import {useState} from 'react';
import Header from './Components/Header';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Screens/Home';
import Auth from './Screens/Auth';
import SignUpScreen from './Screens/Signup';
import {Toaster} from 'react-hot-toast';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home user={user} />} exact/>
            <Route path="/auth" element={<Auth setUser={setUser} />} exact/>
            <Route path="/auth/up" element={<SignUpScreen />} exact/>
          </Routes>
        </Container>
      </main>
      <Toaster 
        position="bottom-center"
        toastOptions={
          {duration: 3000,}
        }
      />
    </Router>
  );
}

export default App;
