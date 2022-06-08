import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  Routes,
  Route,
} from "react-router-dom"

const App = () => {

  const pageSize = 10;
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<News apiKey={apiKey} key="general" pageSize={pageSize} category="general" />} />
        <Route exact path="/business" element={<News apiKey={apiKey} key="business" pageSize={pageSize} category="business" />} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" />} />
        <Route exact path="/health" element={<News apiKey={apiKey} key="health" pageSize={pageSize} category="health" />} />
        <Route exact path="/science" element={<News apiKey={apiKey} key="science" pageSize={pageSize} category="science" />} />
        <Route exact path="/sports" element={<News apiKey={apiKey} key="sports" pageSize={pageSize} category="sports" />} />
        <Route exact path="/technology" element={<News apiKey={apiKey} key="technology" pageSize={pageSize} category="technology" />} />
      </Routes>
    </div>
  )
}

export default App