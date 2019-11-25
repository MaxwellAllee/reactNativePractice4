import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  const [track, setTrack] = useState(false)
  const [location, setLocation] = useState(null)
  const [errMess, setErrMess] = useState(null)
  const [loaded, setLoaded] = useState(false)
  console.log(track)
  const startIt = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setErrMess(
        'Permission to access location was denied',
      )
    }
    else {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      console.log(location)
      setTrack(true)
      setLocation(location)
      console.log('clicked')
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container, styles.centerIt}
        contentContainerStyle={styles.contentContainer}>
        {track ? (

          <View>
            <Text style={styles.textColor}>

              {JSON.stringify(location)}
            </Text>
              <Button title = "stop" onPress={()=>setTrack(false)}/>
          </View>
        ) : (<View>
          <Text style={styles.textColor}>{errMess}</Text>
          <Button title="Start Tracking" onPress={startIt} />
        </View>)}
      </ScrollView>

      <View
        style={[styles.codeHighlightContainer, styles.navigationFilename]}>
        <MonoText style={styles.codeHighlightText}>
          navigation/MainTabNavigator.js
          </MonoText>
      </View>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202A',
    color: 'white'
  },

  textColor: {
    color: 'white'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
