import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <BaseRouter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
