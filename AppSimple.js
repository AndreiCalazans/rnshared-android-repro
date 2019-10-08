/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useContext, useRef, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  SharedElementTransition,
  SharedElement,
  nodeFromRef,
} from 'react-native-shared-element';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  let [transition, setTransition] = useState(false);
  let [move, setMove] = useState(false);
  let position = useRef(new Animated.Value(0));
  let startAncestor = useRef(null);
  let startNode = useRef(null);
  let endAncestor = useRef(null);
  let endNode = useRef(null);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Button
          title="press"
          onPress={() => {
            setTransition(true);
            setMove(e => !e)
            Animated.timing(position.current, {
              toValue: move ? 0 : 1,
              duration: 300,
            }).start(() => {
              setTransition(false);
            });
          }}
        />
        <View style={{ opacity: move ? 0 : 1 }} ref={e => (startAncestor.current = nodeFromRef(e))}>
          <SharedElement onNode={node => startNode.current = node}>
            <Image
              source={{
                uri:
                  'https://cdn3.f-cdn.com/contestentries/1211056/26652088/5a3a9f3881f43_thumb900.jpg',
              }}
              style={{width: 200, aspectRatio: 1}}
            />
          </SharedElement>
        </View>
        <View style={{ opacity: move ? 1 : 0 }} ref={e => (endAncestor.current = nodeFromRef(e))}>
          <SharedElement onNode={node => endNode.current = node}>
            <Image
              source={{
                uri:
                  'https://cdn3.f-cdn.com/contestentries/1211056/26652088/5a3a9f3881f43_thumb900.jpg',
              }}
              style={{width: 200, aspectRatio: 1}}
            />
          </SharedElement>
        </View>
      </ScrollView>
      {transition && (
        <SharedElementTransition
          start={{
            node: startNode.current,
            ancestor: startAncestor.current,
          }}
          end={{
            node: endNode.current,
            ancestor: endAncestor.current,
          }}
          position={position.current}
          animation="move"
          resize="none"
          align="auto"
        />
      )}
    </SafeAreaView>
  );
};

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
