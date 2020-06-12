import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const ButtonContainer = (props) => {
    const { onPress, label, style } = props
    return (
        <TouchableOpacity style={style ? style :  styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    )
}
export default ButtonContainer
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'black',
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4
    },
    text: {
        color: '#f7ce26',
        textAlign: 'center',
        height: 20,
        fontSize: 16,
        margin: 'auto'
    }
})