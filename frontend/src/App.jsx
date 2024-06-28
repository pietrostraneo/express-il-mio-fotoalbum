import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components
import Header from './components/Header/Header';
import Feed from './components/Feed/Feed';
import Login from './components/Login/Login';
import CreatePhoto from './components/CreatePhoto/CreatePhoto';
import SinglePhoto from './components/SinglePhoto/SinglePhoto';
import EditPhoto from './components/EditPhoto/EditPhoto';
import Profile from './components/Profile/Profile';

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
            <Route path="/photo/:id" element={<SinglePhoto />} />
            <Route path="/photo/edit/:id" element={<EditPhoto />} />
            <Route path="/user/:username" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </>
  )

}

export default App
