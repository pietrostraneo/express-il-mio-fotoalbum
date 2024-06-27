import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';

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
            <Route path="/" element={<div><h1>Home</h1></div>} />
            <Route path="/" element={<div><h1>Home</h1></div>} />
            <Route path="/" element={<div><h1>Home</h1></div>} />
            <Route path="/" element={<div><h1>Home</h1></div>} />
          </Routes>
        </main>
      </Router>
    </>
  )

}

export default App
