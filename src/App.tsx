import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import {Passkey} from 'react-native-passkey';
import {PasskeyRegistrationRequest} from 'react-native-passkey/lib/typescript/Passkey';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import AuthRequest from './__mocks__/AuthRequest.json';
import RegRequest from './__mocks__/RegRequest.json';

//TODO: I'm just testing the library using the url from passkeys.io
// but have not get it working yet. May need play around with the headers to get it working
const Hanko_IO_Test_Url =
  'https://b4e894d7-eff0-4c98-91a0-7e1577bfbc8b.hanko.io';

const registerWithPasskey = async (regRequest: PasskeyRegistrationRequest) => {
  try {
    const loginInitRes = axios.post(
      `{Hanko_IO_Test_Url}/webauthn/login/initialize`,
      {},
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-ch-ua':
            '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          cookie: 'hanko_email_id=78042077-24c8-44ea-917b-f7a503499df6',
          Referer: 'https://www.passkeys.io/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      },
    );
    console.log('Registering with Passkey reqest', loginInitRes);
    const result = await Passkey.register(regRequest);
    console.log('Registration result: ', result);
  } catch (e) {
    console.log('reg error', e);
  }
};

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const isSupported: boolean = Passkey.isSupported();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            <Text style={styles.highlight}>Is Passkey Supportted: </Text>{' '}
            {isSupported ? 'Yes' : 'No'}
            <View>
              <Button
                onPress={() => registerWithPasskey(RegRequest)}
                title="Register with Passkey"></Button>
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
