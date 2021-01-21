import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StatusBar,
  ImageBackground,
  Dimensions
} from 'react-native';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import * as Permissions  from 'expo-permissions';
import * as Location from 'expo-location';






export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Temperature: '',
      Pressure: '',
      Humidity: '',
      Prediction: '',
      errormessage: '',
       
    };
  }
    
 
  handlePress = async () => {
    fetch('https://c7e5dbc1-f768-4e35-bbb9-bae0efa7c5e7.mock.pstmn.io/v1/Prediction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        "Temperature": this.state.Temperature,
        "Pressure": this.state.Pressure,
        "Humidity": this.state.Humidity

      }),
    })
   .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        Alert.alert(`FOREST FIRE PREDICTION: ${response.Prediction}`);
        this.Setstate.Prediction = response.Prediction;
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  }

componentdidMount() {
    this._getLocation();
  }

 getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
   if (status == 'granted') {
     console.log('permission granted');
   }

   else if (status !== 'granted') {
      console.log('Turn on Location');
    }
      
      this.setState({
        errormessage: 'Permission for location Denied'
      })
    }
      logLocation = async () => {
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          

        })
          .then(position => {
            console.log("currentPosition", position);
           
          })
          .catch(error => {
            console.log(error);
          });
      };
    


      Openmaps =  async () => {
    
        if (this.state.response >=  '60'){
          alert("Log your position and call for help");
    
        }
    
    
    
      }


 


  checkValueFunction = () => {
    var doHandlePress = true;

    // Check Temperature
    if (this.state.Temperature == '') {
      alert("Temperature is Empty");
      doHandlePress = false;
    } else if (isNaN(this.state.Temperature)) {
      alert("Temperature must be numeric");
      this.state.Temperature = '';
      doHandlePress = false;
    }

    // Check Pressure
    if (this.state.Pressure == '') {
      alert("Pressure is Empty");
      doHandlePress = false;
    } else if (isNaN(this.state.Pressure)) {
      alert("Pressure must be numeric");
      this.state.Pressure = '';
      doHandlePress = false;
    }

    // Check Humidity
    if (this.state.Humidity == '') {
      alert("Humidity is Empty");
      doHandlePress = false;
    } else if (isNaN(this.state.Humidity)) {
      alert("Humidity must be numeric");
      this.state.Humidity = '';
      doHandlePress = false;
    }
    console.log(this.state);

    if(doHandlePress) {
      this.handlePress();
    }
  }

  render() {

    return (
      
      <View style={styles.root}>
        
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
        
        <View style={styles.background}>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("./assets/images/Gradient_I4udHNE.png")}
          >
            <View style={styles.logoColumn}>
              <View style={styles.logo}>
                <View style={styles.endWrapperFiller}></View>
                <View style={styles.text3Column}>
                  <Text style={styles.text3}>FireApp</Text>
                  <View style={styles.rect7}></View>
                </View>
              </View>
              <View style={styles.form}>
                <View style={styles.tempColumn}>
                  <View style={styles.temp}>
                    <EvilIconsIcon
                      name="arrow-right"
                      style={styles.icon22}
                    ></EvilIconsIcon>

                    <TextInput
                      placeholder="Temperature"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.tempInput}
                      onChangeText={data => this.setState({ Temperature: data })}
                    ></TextInput>
                  </View>
                  <View style={styles.pressure}>
                    <EvilIconsIcon
                      name="arrow-right"
                      style={styles.icon2}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Pressure"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.pressureInput}
                      onChangeText={data => this.setState({ Pressure: data })}
                    ></TextInput>
                  </View>
                  <View style={styles.pressure}>
                    <EvilIconsIcon
                      name="arrow-right"
                      style={styles.icon2}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Humidity"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.pressureInput}
                      onChangeText={data => this.setState({ Humidity: data })}
                    ></TextInput>
                  </View>
                </View>
              </View>
              <View style={styles.tempColumnFiller}></View>
              <TouchableOpacity
                onPress={this.logLocation.bind(this)}
                style={styles.button}
              >
                <Text style={styles.text2}>Send Location</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.checkValueFunction.bind(this)}
                style={styles.button}
              >
                <Text style={styles.text2}>Submit</Text>
              </TouchableOpacity>
             
             
      
               </View>

            
  
           
          </ImageBackground>
        </View>
      </View>

      
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  logo: {
    width: 102,
    height: 111,
    alignSelf: "center"
  },
  endWrapperFiller: {
    flex: 1
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginBottom: 4
  },
  rect7: {
    height: 8,
    backgroundColor: "#25cdec",
    marginRight: 4
  },
  text3Column: {
    marginBottom: 6,
    marginLeft: 2,
    marginRight: -1
  },
  form: {
    height: 230,
    marginTop: 50
  },
  temp: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  tempInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 14
  },
  pressure: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  pressureInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  tempColumn: {},
  tempColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: 27
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  logoColumn: {
    marginTop: 50,
    marginLeft: 41,
    marginRight: 41
  },
  logoColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

