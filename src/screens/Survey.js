import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native'
import { View, StyleSheet, Dimensions, Text, ScrollView, TouchableOpacity, FlatList, ImageBackground, TextInput } from 'react-native'
import Button from '../components/shared/Button'
// import TextInput from '../components/shared/TextInput'
import Link from '../components/shared/Link'
import styles from '../assets/styles';
import SurveyItem from '../components/SurveyItem'
import { Survey } from '../constants/Survey'
import * as SurveyAction from '../actions/SurveyAction';
import RadioButton from '../components/shared/RadioButton'
import MultiSelect from '../components/shared/MultiSelect'

const { width, height } = Dimensions.get("window");

const SurveyScreen = (props) => {
    const [surveyCount, changeSurveyCount] = useState(0)
    const [selectedId, changeSelectedId] = useState(null)
    const { navigation, SurveyAction, questions } = props
    const surveyQuestion = (questions && questions.length > surveyCount) ? questions[surveyCount] : null

    const isFocused = useIsFocused()
    useEffect(() => {
        SurveyAction.getSurveyQuestions()
    }, [isFocused])

    return (
        <View style={styles.containerMatches}>

            <View style={styles.top}>
                <Text style={styles.title}>Survey</Text>
            </View>
            {surveyQuestion &&
                <>
                    <ScrollView>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>{surveyQuestion.question}</Text>
                        </View>
                        {surveyQuestion.answers.length > 0 && !surveyQuestion.multiselect && <RadioButton items={surveyQuestion.answers} selectedAnswer = {null} />}
                        {surveyQuestion.answers.length > 0 && surveyQuestion.multiselect && <MultiSelect items={surveyQuestion.answers} selectedAnswer = {[]} />}

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

                    <View style={styles.bottom}>
                        <Button label="Next" onPress={() => {
                            surveyCount < questions.length - 1 ? changeSurveyCount(surveyCount + 1) :
                                navigation.navigate('Transitions')
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

