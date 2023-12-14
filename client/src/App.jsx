import './App.css';
import { Outlet } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {  InMemoryCache, ApolloClient, createHttpLink, ApolloProvider} from '@apollo/client';
import Navbar from './components/Navbar';

// creates a new httpslink app
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Navbar />
    <Outlet />
  </ApolloProvider>
  );
}

export default App;
