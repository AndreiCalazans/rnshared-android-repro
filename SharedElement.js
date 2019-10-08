import React, { useContext, createContext, useState, useEffect, useRef, useCallback, useLayoutEffect, } from 'react';
import {View, Animated} from 'react-native';
import {
  SharedElementTransition,
  SharedElement,
  nodeFromRef,
} from 'react-native-shared-element';

export let SharedTransitionContext = createContext({
  isTransition: false,
  setTransition: () => null,
  runAnimation: (fromTag: string, toTag: string, progress: number) => null,
  setNode: (tag: string) => (ref: any) => null,
  setAncestor: (tag: string) => (ref: any) => null,
  nodes: {},
  ancestors: {},
});

export let withSharedTransitionContext = WrappedComponent => props => {
  let [transition, setTransition] = useState({
    from: undefined,
    to: undefined,
    progress: 1,
  });
  let nodes = useRef(null);
  let ancestors = useRef(null);
  let position = useRef(new Animated.Value(0));

  let runAnimation = (from, to, progress) => {
    setTransition({from, to, progress});
  };

  useLayoutEffect(() => {
    if (!transition.from) {
      return;
    }

    Animated.spring(position.current, {
      toValue: transition.progress,
    }).start(e => {
      setTransition({from: undefined, to: undefined, progress: 0});
    });
  }, [transition.from]);

  const setNodeRef = useCallback(tag => {
    return ref => (nodes.current = {...nodes.current, [tag]: ref});
  }, []);

  const setAncestorRef = useCallback(tag => {
    return ref =>
      (ancestors.current = {...ancestors.current, [tag]: nodeFromRef(ref)});
  }, []);

  return (
    <SharedTransitionContext.Provider
      value={{
        setNode: setNodeRef,
        setAncestor: setAncestorRef,
        runAnimation,
      }}>
      <WrappedComponent {...props} />
      {/* @TODO: Render multiple shared elements */}
      {transition.from && (
        <SharedElementTransition
          start={{
            node: nodes.current[transition.from],
            ancestor: ancestors.current[transition.from],
          }}
          end={{
            node: nodes.current[transition.to],
            ancestor: ancestors.current[transition.to],
          }}
          position={position.current}
          animation="move"
          resize="none"
          align="auto"
        />
      )}
    </SharedTransitionContext.Provider>
  );
};

export function SharedTransitionElement({tag, children, ...viewProps}) {
  let {setNode, setAncestor} = useContext(SharedTransitionContext);
  return (
    <View {...viewProps} ref={setAncestor(tag)}>
      <SharedElement onNode={setNode(tag)}>{children}</SharedElement>
    </View>
  );
}
