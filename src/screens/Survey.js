import React, { useState, useEffect } from 'react'
import * as Progress from 'react-native-progress'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native'
import Button from '../components/shared/Button'
import styles from '../assets/styles';
import SurveyItem from '../components/SurveyItem'
import { Survey } from '../constants/Survey'
import * as SurveyAction from '../actions/SurveyAction';
import RadioButton from '../components/shared/RadioButton'
import MultiSelect from '../components/shared/MultiSelect'

const { width, height } = Dimensions.get("window");

const SurveyScreen = (props) => {
    const [showTransition, changeShowTransition] = useState(true)
    const [surveyCount, changeSurveyCount] = useState(0)
    const [selectedId, changeSelectedId] = useState(null)
    const [progressStatus, changeProgressStatus] = useState(0)
    const { navigation, SurveyAction, questions } = props
    const surveyQuestion = (Survey && Survey.length > surveyCount) ? Survey[surveyCount] : null

    const isFocused = useIsFocused()
    useEffect(() => {
        SurveyAction.getSurveyQuestions()
    }, [isFocused])

    const handleOnPressSave = () => {
        if (surveyCount < Survey.length - 1) {
            if (showTransition && surveyCount >= (Survey.length - 1) / 2) {
                changeShowTransition(false)
                navigation.navigate('Transitions')
            }
            changeProgressStatus((surveyCount + 1) / Survey.length)
            changeSurveyCount(surveyCount + 1)

        } else {
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.containerMatches}>

            <View style={styles.top}>
                <Text style={styles.title}>Survey</Text>
            </View>
            <View style={{ height: 8, alignItems: 'center' }}>
                <Progress.Bar progress={progressStatus} width={width - 60} />
            </View>
            {surveyQuestion &&
                <>
                    <ScrollView>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{surveyQuestion.question}</Text>
                        </View>
                        {surveyQuestion.answers.length > 0 && !surveyQuestion.multiselect && <RadioButton items={surveyQuestion.answers} selectedAnswer={null} />}
                        {surveyQuestion.answers.length > 0 && surveyQuestion.multiselect && <MultiSelect items={surveyQuestion.answers} selectedAnswer={[]} />}

                        {surveyQuestion.answers.length === 0 &&
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    multiline
                                    numberOfLines={4}
                                    style={styles.textInput}
                                // onChangeText={text => onChangeText(text)}
                                // value={value}
                                />
                            </View>
                        }

                        <FlatList
                            numColumns={2}
                            data={surveyQuestion.options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <SurveyItem
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    variant
                                    isSelected={false}
                                />
                            )}
                        />
                    </ScrollView>

                    <View style={{
                        display: 'flex', flexDirection: 'row', width: width - 30,
                        marginBottom: 10, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Button
                            onPress={() => {
                                navigation.navigate('Log Off')
                            }}
                            label="Save" style={{
                                borderWidth: 1, padding: 10, width: (width - 40) / 2, justifyContent: 'center', alignItems: 'center', marginRight: 10,
                                textAlign: 'center',
                                backgroundColor: 'black',
                                marginBottom: 12,
                                borderRadius: 4
                            }} />
                        <Button onPress={handleOnPressSave} label="Next" style={{
                            borderWidth: 1, padding: 10, width: (width - 40) / 2, justifyContent: 'center', alignItems: 'center',
                            textAlign: 'center',
                            backgroundColor: 'black',
                            marginBottom: 12,
                            paddingVertical: 12,
                            borderRadius: 4
                        }} />
                    </View>
                </>
            }
        </View>
    )
}
const mapStateToProps = ({ survey }) => {
    return {
        questions: survey
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        SurveyAction: bindActionCreators(SurveyAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyScreen)

