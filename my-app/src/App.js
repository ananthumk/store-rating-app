
import './App.css';
import Home from './pages/Home/Home';
import LoginForm from './pages/LoginForm/LoginForm';
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/login" element={ <LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
