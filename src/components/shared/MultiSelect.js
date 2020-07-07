import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Checked from '../../assets/images/checked.png'
import UnChecked from '../../assets/images/unchecked.jpeg'

const MultiSelect = (props) => {
    const { items, selectedId, changeSelectedId } = props

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
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 15 }}>
                        <TouchableOpacity onPress={() => {
                            let ids = [...selectedId || []]
                            if (ids.includes(item.id)) {
                                ids = ids.filter(id =>
                                    id !== item.id
                                )
                            } else {
                                ids.push(item.id)
                            }
                            changeSelectedId(ids)
                        }
                        }>
                            {selectedId && selectedId.includes(item.id) ?
                                <Image source={Checked} style={imageStyle} /> :
                                <Image source={UnChecked} style={imageStyle} />}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, marginLeft: 5, marginRight: 10 }}>{item.answer}</Text>
                    </View>
                )
            })}
        </View>
    )
}
export default MultiSelect