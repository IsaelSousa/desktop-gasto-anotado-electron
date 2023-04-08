import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from './Context/provider'
import HomePage from './views/Pages/HomePage';

function App() {
  return (
    <Container>
      <Router>
        <Provider>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Provider>
      </Router>
    </Container>
  )
}

export default App;

const Container = styled.div`
  background-color: #d9d9d9;
  width: 100vw;
  height: 100vh;

`
