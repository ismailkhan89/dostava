import { setContext } from 'apollo-link-context'
export const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const userData = localStorage.getItem('user-dostava');
    const parsData = JSON.parse(userData);
    let token = parsData.token;
    console.log("parsDate",parsData)
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
});