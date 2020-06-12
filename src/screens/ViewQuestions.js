import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, Image, LayoutAnimation } from 'react-native'
import styles from '../assets/styles';
import Avatar from '../assets/images/avatar.jpeg'
import FlashMessage from "react-native-flash-message";
import { Survey } from '../constants/Survey'
import Answers from '../components/shared/Answers'

const { width, height } = Dimensions.get("window");

const ViewQuestions = (props) => {
    const { navigation } = props
    const [expandedIds, changeExpanded] = useState([])
    const imageStyle = [
        {
            alignItems: 'flex-start',
            width: 30,
            height: 30,
            borderRadius: 15
        }
    ];

    return (
        <>
            {/* <Spinner
                visible={spinner}
            /> */}
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => { navigation.openDrawer() }}>
                    <Image source={Avatar} style={imageStyle} />
                </TouchableOpacity>
                <Text style={styles.title}>My Chart</Text>
            </View>
            <ScrollView>
                <View style={{marginTop: 10}}>
                    <FlatList
                        data={Survey}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity onPress={() => {
                                    LayoutAnimation.configureNext( LayoutAnimation.Presets.easeInEaseOut );
                                    let ids = [...expandedIds]
                                    if (ids.includes(item.id)) {
                                        ids = ids.filter(id =>
                                            id !== item.id
                                        )
                                    } else {
                                        ids.push(item.id)
                                    }
                                    changeExpanded(ids)
                                }}>
                                    <View style={styles.containerAccountTitle}>
                                        <Text style={styles.homeText}>{item.question}</Text>
                                    </View>
                                </TouchableOpacity>
                                {expandedIds.includes(item.id) &&
                                    <View style={{ marginTop: 10 }}>
                                        <Answers items={item.answers} selectedAnswer={1} multiselect={item.multiselect} />
                                    </View>
                                }
                            </>
                        )}

                    />
                </View>
            </ScrollView>
            <FlashMessage position="top" />
        </>
    )
}
export default ViewQuestions