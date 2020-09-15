import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { server_url } from  "../config/config";
import { authLink } from '../library/authLink';

function clients(){
    const cache = new InMemoryCache()
    const httpLink = createUploadLink({
    uri: `${server_url}graphql`,
    })

    const client = new ApolloClient({
        link: authLink.concat(httpLink) ,
        cache
    });

    return client
}

export default clients
