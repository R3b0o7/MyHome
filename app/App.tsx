import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';

import {
  Platform,
  PlatformColor,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//import SPLASH
import SplashScreen from 'react-native-splash-screen'

//import strings
import I18n from './assets/strings/I18';

//import assets
import IMAGES from './assets/images/Images';

import RootNavigator from './navigation/RootNavigator';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // Muestra la pantalla de inicio al inicio de la aplicación.
    SplashScreen.show();

    // Simula un retraso de 2 segundos (puedes personalizar esto según tus necesidades).
    setTimeout(() => {
      // Oculta la pantalla de inicio cuando tu aplicación esté lista.
      SplashScreen.hide();
    }, 2000);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return <RootNavigator/>;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
