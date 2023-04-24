import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from './Context/provider'
import { GraphPage } from './views/Pages/GraphPage';
import HomePage from './views/Pages/HomePage';

function App() {
  return (
    <Container>
      <Router>
        <Provider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/graph' element={<GraphPage />} />
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
`;
