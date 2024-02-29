import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GettingStartedScreen from '../../screens/getting-started/GettingStartedScreen';
import BottomTabNavigator from '../BottomTab/BottomTabNavigator';
import AuthStackNavigator from '../AuthStack/AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading/Loading';
import { theme } from '../../utils/colors';
import TheoryTestScreen from '../../screens/theory-test/TheoryTestScreen';
import QuestionScreen from '../../screens/questions/QuestionScreen';
import HazardPerception from '../../screens/hazard-perception/HazardPerception';
import ReviewAllClips from '../../screens/review-all-clips/ReviewAllClips';
import MockTestResult from '../../screens/mock-test-result/MockTestResult';
import ReviewMockTest from '../../screens/review-mock-test/ReviewMockTest';
import AllMockTestTopic from '../../screens/all-mock-test-topics/AllMockTestTopics';
import RevisionQuestionByTopic from '../../screens/questions/RevisionQuestionByTopic';
import ReviewQuestionScreen from '../../screens/questions/ReviewQuestion';
import FlaggedQuestionScreen from '../../screens/questions/FlaggedQuestion';
import DownloadVideoScreen from '../../screens/download-video/DownloadVideoScreen';


const Stack = createNativeStackNavigator();


const RootNavigation = () => {

    const { isAppIntro } = useSelector(state => state.userReducer)

    const [initialRoute, setInitialRoute] = useState(null);
    const [appLoading, setAppLoading] = useState(true)



    useEffect(() => {
        setTimeout(() => {
            getInitailRoute()
            setAppLoading(false)
        }, 2000);
    }, [initialRoute]);

    const getInitailRoute = () => {
        if (!isAppIntro) {
            setInitialRoute('getting')
        } else {
            setInitialRoute("bottom-tab")
        }
    }

    if (appLoading) {
        return <Loading size={60} color={theme.black} />
    }

    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="getting" component={GettingStartedScreen} />
            <Stack.Screen name="bottom-tab" component={BottomTabNavigator} />
            <Stack.Screen name="theory-test" component={TheoryTestScreen} />
            <Stack.Screen name="question" component={QuestionScreen} />
            <Stack.Screen name="hazard" component={HazardPerception} />
            <Stack.Screen name="review-clips" component={ReviewAllClips} />
            <Stack.Screen name="download-video" component={DownloadVideoScreen} />
            <Stack.Screen name="flagged-question" component={FlaggedQuestionScreen} />
            <Stack.Screen name="mock-result" component={MockTestResult} />
            <Stack.Screen name="review-mock-test" component={ReviewMockTest} />
            <Stack.Screen name="review-question" component={ReviewQuestionScreen} />
            <Stack.Screen name="all-mock-test-topics" component={AllMockTestTopic} />
            <Stack.Screen name="revision-question-by-topic" component={RevisionQuestionByTopic} />
            <Stack.Screen name="auth-stack" component={AuthStackNavigator} />
        </Stack.Navigator>
    )
}

export default RootNavigation