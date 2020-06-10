import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const LinkContainer = (props) => {
    const { onPress, label } = props
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}
export default LinkContainer
const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-around'
    },
    text: {
        fontWeight: 'bold',
        color: 'blue'
    }
})