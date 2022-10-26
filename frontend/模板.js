import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Demo = props => {
    return (
        <View style={styles.screen}>
            <Text>Demo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Demo
