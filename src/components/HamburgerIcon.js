import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const HamburgerIcon = ({ navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('DrawerToggle')}
            style={{
                height: '100%',
                width: 60,
                // marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
                // borderWidth: 1, borderColor: 'red',
            }}
        >
            <Text
                style={{
                    fontSize: 25,
                }}
            ></Text>
        </TouchableOpacity>
    )
}
export default HamburgerIcon
