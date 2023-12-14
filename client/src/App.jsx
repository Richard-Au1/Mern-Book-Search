import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {  InMemoryCache, ApolloClient, createHttpLink, ApolloProvider} from '@apollo/client';
import Navbar from './components/Navbar';

// creates a new httpslink app
const httpLink = createHttpLink({
  uri: '/graphql',
});

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
