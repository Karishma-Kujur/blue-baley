import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const LinkContainer = (props) => {
    const { onPress, label } = props
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}
export default LinkContainer
const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: 'blue'
    }
})