import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import Login from './components/Login/Login';
import CreatePhoto from './components/CreatePhoto/CreatePhoto';

// Importing styles
import './App.scss'

function App() {

  return (
    <>
      <Router>
        <header>
          <Header />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/photo/create" element={<CreatePhoto />} />
            <Route path="/user/:id" element={<div><h1>Home</h1></div>} />
            <Route path="/" element={<div><h1>Home</h1></div>} />
          </Routes>
        </main>
      </Router>
    </>
  )

}

export default App
