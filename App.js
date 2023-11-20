import Navigation from './components/Navigation.js';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from './components/Text.js';
import { useFonts } from 'expo-font';
import { AlarmContextProvider } from './components/alarm/AlarmContext.js';
import { DateContextProvider } from './components/date/DateContext.js';

import WorkoutLog from './components/workout/WorkoutLog.js';
import Exercises from './components/exercises/Exercises.js';
import Feed from './components/Feed.js';
import Calendar from './components/calendar/Calendar.js';
import Settings from './components/settings/Settings.js';

import Login from './components/settings/profile/Login.js';
import Register from './components/settings/profile/Register.js'

import CreateExercise from './components/exercises/CreateExercise.js';
import ExerciseForm from './components/exercises/ExerciseForm.js';
import CategoryList from './components/exercises/CategoryList.js';
import TypeList from './components/exercises/TypeList.js';

import FeedSVG from './images/FeedSVG.svg';
import WorkoutLogSVG from './images/WorkoutLogSVG.svg';
import ExerciseSVG from './images/ExerciseSVG.svg';
import SettingsSVG from './images/SettingsSVG.svg';
import CalendarTabSVG from './images/CalendarTabSVG.svg';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold
} from '@expo-google-fonts/inter';


const WorkoutIcon = ({ focused, color, size }) => {

  return (
    <WorkoutLogSVG height={size} fill={color} />
  )
}
const ExerciseIcon = ({ focused, color, size }) => {

  return (
    <ExerciseSVG height={size} fill={color} />
  )
}
const SettingsIcon = ({ focused, color, size }) => {

  return (
    <SettingsSVG height={size} fill={color} />
  )
}

const FeedIcon = ({ focused, color, size }) => {

  return (
    <FeedSVG height={size} fill={color} />
  )
}

const CalendarIcon = ({ focused, color, size }) => {

  return (
    <CalendarTabSVG height={size} fill={color} />
  )
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SettingsWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={headerOptions} />
      <Stack.Screen name="Login" component={Login} options={headerOptions} />
      <Stack.Screen name="Register" component={Register} options={headerOptions} />
    </Stack.Navigator>
  )
}

function ExercisesWrapper() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Exercises" component={Exercises} options={{
        ...headerOptions, headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CreateExerciseTab')}>
            <Text style={{ fontSize: 16, marginRight: 15, color: '#006EE6' }}>Create</Text>
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="CreateExerciseTab" component={CreateExerciseWrapper} options={{ ...headerOptions, headerShown: false, title: "Create Exercise" }} />
      <Stack.Screen name="ExerciseForm" component={ExerciseForm} options={({ route }) => ({ ...headerOptions, title: route.params.key1 })} />
    </Stack.Navigator>
  )
}

function CreateExerciseWrapper() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateExercise" component={CreateExercise} options={{ ...headerOptions, title: "Create Exercise" }} />
      <Stack.Screen name="CategoryList" component={CategoryList} options={{ ...headerOptions, title: "Categories" }} />
      <Stack.Screen name="TypeList" component={TypeList} options={{ ...headerOptions, title: "Types" }} />
    </Stack.Navigator>
  )
}

function WorkoutsWrapper() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorkoutLog" component={WorkoutLog} options={{
        ...headerOptions, title: "Workout Log", headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('CalendarView')} style={{ paddingRight: 25, justifyContent: 'center' }}>
            <Text style={{ color: '#006EE6', fontSize: 30 }}>+</Text>
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="CalendarView" component={Calendar} options={{ tabBarIcon: CalendarIcon, title: "Calendar" }} />
    </Stack.Navigator>
  )
}


export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <AlarmContextProvider>
      <DateContextProvider>
        <NavigationContainer>
          <Tab.Navigator tabBar={Navigation}>
            <Tab.Screen name="WorkoutLogTab" component={WorkoutsWrapper} options={{ tabBarIcon: WorkoutIcon, headerShown: false, title: "WorkoutLog" }} />
            <Tab.Screen name="CalendarTab" component={Calendar} options={{ tabBarIcon: CalendarIcon, headerShown: false, title: "Calendar" }} />
            <Tab.Screen name="ExercisesTab" component={ExercisesWrapper} options={{ tabBarIcon: ExerciseIcon, headerShown: false, title: "Exercises" }} />
            <Tab.Screen name="FeedTab" component={Feed} options={{ tabBarIcon: FeedIcon, ...headerOptions, title: "Feed" }} />
            <Tab.Screen name="SettingsTab" component={SettingsWrapper} options={{ tabBarIcon: SettingsIcon, headerShown: false, title: "Settings" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </DateContextProvider>
    </AlarmContextProvider>
  );
}


const headerOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    height: 90,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'hsla(0, 0%, 0%, 0.35)'
  },
}