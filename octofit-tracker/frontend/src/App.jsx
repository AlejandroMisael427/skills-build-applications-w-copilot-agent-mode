import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">OctoFit Tracker</a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to OctoFit Tracker</h1>
      <p>Track your activities, manage teams, and compete on the leaderboard!</p>
    </div>
  )
}

export default App
