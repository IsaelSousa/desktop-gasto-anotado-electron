import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from './Context/provider'
import { GraphPage } from './views/Pages/GraphPage';
import HomePage from './views/Pages/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Container>
      <ToastContainer
        position='top-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        style={{ background: 'none' }}
      />
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
