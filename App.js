/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {SharedTransitionContext, withSharedTransitionContext, SharedTransitionElement} from './SharedElement';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = withSharedTransitionContext(() => {
  let {runAnimation} = useContext(SharedTransitionContext);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Button
            title="press"
            onPress={() => {
              runAnimation('TalkDetail', 'TalkTwo', 1);
            }}
          />
          <SharedTransitionElement tag="TalkDetail">
            <Image
              source={{
                uri:
                  'https://avatars1.githubusercontent.com/u/20777666?s=460&v=4',
              }}
              style={{width: 200, aspectRatio: 1}}
            />
          </SharedTransitionElement>
          <SharedTransitionElement tag="TalkTwo">
            <Image
              source={{
                uri:
                  'https://avatars1.githubusercontent.com/u/20777666?s=460&v=4',
              }}
              style={{width: 200, aspectRatio: 1}}
            />
          </SharedTransitionElement>
        </ScrollView>
      </SafeAreaView>
    </>
  );
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
