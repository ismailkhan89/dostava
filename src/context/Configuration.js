import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { getConfiguration } from '../apollo/server'

const GETCONFIGURATION = gql`${getConfiguration}`

const ConfigurationContext = React.createContext({});

export const ConfigurationProvider = props => {
    const {loading ,error ,data } = useQuery(GETCONFIGURATION, { fetchPolicy: 'cache-and-network'  })

    const configuration = loading || error || !data.configuration ? {} : data.configuration;
    return (
        <ConfigurationContext.Provider value={configuration}>{props.children}</ConfigurationContext.Provider>
    );
};
export const ConfigurationConsumer = ConfigurationContext.Consumer;
export default ConfigurationContext;