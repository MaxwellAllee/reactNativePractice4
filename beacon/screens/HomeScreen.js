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
import gps from '../components/gps'

export default function HomeScreen() {
  let loop
  const [location, setLocation] = useState(null)
  const [errMess, setErrMess] = useState(null)
  const [on, setOn] = useState(false)
  const locateMe = async () => {
    const local = await gps()
    console.log(typeof local)

    if(typeof local === 'string'){
      setErrMess(local)
    }
    else{
      console.log(on)
      if(setOn) setLocation(local)
    }
  }
  const stop=()=>{
    clearTimeout(loop)
    setOn(false)
    setLocation(null)
  }
  const start =()=>{
    locateMe()
    setOn(true)
    loop = setTimeout(()=>locateMe(), 10000)
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container, styles.centerIt}
        contentContainerStyle={styles.contentContainer}>
        {location ? (

          <View>
            <Text style={styles.textColor}>

              {JSON.stringify(location)}
            </Text>
              <Button title = "stop" onPress={stop}/>
          </View>
        ) : (<View>
          <Text style={styles.textColor}>{errMess}</Text>
          <Button title="Start Tracking" onPress={start} />
        </View>)}
      </ScrollView>

      <View
        style={[styles.codeHighlightContainer, styles.navigationFilename]}>
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
