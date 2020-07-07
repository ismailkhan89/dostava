import React from 'react';
import {
    View,

    ActivityIndicator
} from 'react-native';
import gql from 'graphql-tag'
import { profile } from '../apollo/server'
import { colors } from './colors';
import { useQuery } from '@apollo/react-hooks'

const PROFILE = gql`${profile}`

function AuthLoading() {


    useQuery(PROFILE, { onCompleted, onError })
    // Fetch the token from storage then navigate to our appropriate place

    onCompleted = (data) => {
        this.props.navigation.navigate('Menu');
    }
    onError = (error) => {
        this.props.navigation.navigate('Auth', { screen: 'Login' });
    }
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primaryOrangeColor} />
    </View>)
    // Render any loading content that you like here

}

export default AuthLoading