import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Selected from '../../assets/images/selected.png'
import UnSelected from '../../assets/images/unselected.png'

const RadioButtonComponent = (props) => {
    const { items, selectedAnswer, setAnswer, selectedId, changeSelectedId } = props

    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 20,
            height: 20,
        }
    ];

    return (
        <View>
            {items.map((item) => {
                return (
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => {
                            changeSelectedId(item.id)
                            setAnswer(item.answer)
                        }
                        }>
                            {selectedId === item.id ?
                                <Image source={Selected} style={imageStyle} /> :
                                <Image source={UnSelected} style={imageStyle} />}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 10 }}>{item.answer}</Text>
                    </View>
                )
            })}
        </View>
    )
}
export default RadioButtonComponent