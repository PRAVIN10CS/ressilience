import React, { useEffect, useState, useRef } from 'react'
import { Text, View, StyleSheet, BackHandler, Button, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress';
import {
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE, CustomTabs
} from 'react-native-custom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { event } from 'react-native-reanimated';




const Loading = () => {
  return (
    <ActivityIndicator
      color="#3235fd"
      size="large"
      style={styles.IndicatorStyle}
    />
  );
};
const Error = ({ reload }) => {
  return (
    <View style={styles.loadingWrapper}>
      <Button
        style={styles.retry}
        title="Retry"
        onPress={reload}
      />
    </View>
  );
};
const HomePage = ({ navigation }) => {
  const webviewRef = useRef();
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://xsinfoways.net/resi_work/')
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    getValue();

  }, []);
  const getValue = async () => {
    console.log('getValue')
    const value = await AsyncStorage.getItem('token')
    console.log(value)

  }
  const onProgessLoad = ({ nativeEvent }) => {
    console.log("onProgressLoad")
    setProgress(nativeEvent.progress)

  }
  const onNavigationStateChange = (navState) => {
    console.log("onNavigationStateChange")
    if (navState.url.includes('https://xsinfoways.net/Myresiliancework/login.html')) {
      console.log('stopLoading')
      // navigation.replace('Login')
    }
    else if (navState.url.includes('pdf')) {
      console.log(navState.url + "true")
      CustomTabs.openURL(navState.url, {
        toolbarColor: '#607D8B',
        enableUrlBarHiding: true,
        showPageTitle: true,
        enableDefaultShare: true,
        animations: {
          startEnter: 'slide_in_bottom',
          startExit: 'slide_out_bottom',
          endEnter: 'slide_in_bottom',
          endExit: 'slide_out_bottom',
        },
        headers: {
          'my-custom-header': 'my custom header value'
        },
        forceCloseOnRedirection: true,
      });
    }


  };
  const reload = () => {
    webviewRef.current.reload();
  }
  const handleMessage = (event) => {
    if (event.nativeEvent.data && event.nativeEvent.data.indexOf("$#doctitle-") == 0) {
 
    }
  }


  return (

    <View style={styles.wrapper}>
      {
        !loaded ? <Progress.Bar progress={progress} width={null} borderWidth={0} borderRadius={0} color={'orange'} /> : null

      }

      <WebView
        ref={webviewRef}
        source={{ uri: currentUrl }}
        style={styles.webView}
        injectedJavaScript="window.currentloc = location.href;setInterval(function() {if (window.currentloc != location.href) {window.currentloc = location.href;window.postMessage('$#doctitle-' + document.title);}}, 500);"
        onMessage={handleMessage}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        onLoadEnd={() => {
          console.log('onLoadEnd')
          setLoaded(true)
        }}
        onLoadProgress={onProgessLoad}
        // renderLoading={() => <Loading />}
        // renderError={() => <Error reload={reload} />}
        startInLoadingState
      />
    </View>
  )

}
export default HomePage;
const styles = StyleSheet.create({
  loading: {
    color: '#696969',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingWrapper: {
    backgroundColor: '#ffffff',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    right: 100,
    top: 10,
  },
  retry: {
    alignSelf: 'center',
    width: 100,
    marginLeft: 100,
    marginRight: 120,
    paddingHorizontal: 100,
    paddingVertical: 50,
  },
  webView: {
    flex: 1,
  },
  wrapper: {
    backgroundColor: '#48bf91',
    flex: 1,
  },
  IndicatorStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});

