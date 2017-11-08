import * as React from "react";
import {
  View,
  Dimensions,
  NativeModules
  // LayoutAnimation,
} from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Title,
  // Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  // List, ListItem,
  Footer
} from "native-base";

import styles from "./styles";

const { UIManager } = NativeModules;

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const WIDTH_NAME = ["width_1st", "width_2nd", "width_3rd", "width_4th"];
export interface Props {
  navigation: any;
  list: any;
}
export interface State {}
class Home extends React.Component<Props, State> {
  state = {
    swipeBegin: 0,
    activeTab: 1,
    tabWidth: SCREEN_WIDTH / 10,
    [WIDTH_NAME[0]]: SCREEN_WIDTH / 10 * 7,
    [WIDTH_NAME[1]]: SCREEN_WIDTH / 10,
    [WIDTH_NAME[2]]: SCREEN_WIDTH / 10,
    [WIDTH_NAME[3]]: SCREEN_WIDTH / 10
  };
  constructor(props) {
    super(props);
    this._onSwipe = this._onSwipe.bind(this);
    this._onSwipeBegin = this._onSwipeBegin.bind(this);
    this._onSwipeEnd = this._onSwipeEnd.bind(this);
  }
  _onSwipeBegin(swipeBegin) {
    this.setState({
      swipeBegin: swipeBegin
    });
  }
  _onSwipe(locationX) {
    console.log(locationX, SCREEN_WIDTH);
    let swipeWitdh = locationX - this.state.swipeBegin;
    let oldActiveTab = this.state.activeTab;
    // let oldActiveTabWith = this.state[WIDTH_NAME[oldActiveTab]] - swipeWitdh * 2;
    let nextTab, activeTab;
    let nextTabWith;
    // if (Math.abs(swipeWitdh) > SCREEN_WIDTH / 4) {
    if (swipeWitdh > 0) {
      if (oldActiveTab + 1 > 3) {
        nextTab = oldActiveTab + 1;
      }
      activeTab = oldActiveTab + 1 > 3 ? 0 : oldActiveTab + 1;
      nextTabWith =
        oldActiveTab + 1 > 3
          ? this.state[WIDTH_NAME[oldActiveTab + 1]] + swipeWitdh * 2
          : this.state[WIDTH_NAME[oldActiveTab + 1]];
    } else {
      if (oldActiveTab - 1 > -1) {
        nextTab = oldActiveTab - 1;
      }
      activeTab = oldActiveTab - 1 > -1 ? oldActiveTab - 1 : 4;
      nextTabWith =
        oldActiveTab - 1 > -1
          ? this.state[WIDTH_NAME[oldActiveTab - 1]] + swipeWitdh * 2
          : this.state[WIDTH_NAME[oldActiveTab - 1]];
    }
    // }
    this.setState({
      activeTab
      // [WIDTH_NAME[oldActiveTab]]: oldActiveTabWith,
      // [WIDTH_NAME[nextTab]]: nextTabWith,
    });
  }
  _onSwipeEnd() {
    let activeTab = this.state.activeTab;
    let newState = Object.assign(
      {
        [WIDTH_NAME[0]]: SCREEN_WIDTH / 10,
        [WIDTH_NAME[1]]: SCREEN_WIDTH / 10,
        [WIDTH_NAME[2]]: SCREEN_WIDTH / 10,
        [WIDTH_NAME[3]]: SCREEN_WIDTH / 10
      },
      {
        [WIDTH_NAME[activeTab]]: SCREEN_WIDTH / 10 * 7
      }
    );
    // Animate the update
    // LayoutAnimation.easeInEaseOut(LayoutAnimation.Presets.easeInEaseOut, () => {
    //   console.log("anitmation end.");
    // });
    this.setState(newState);
  }
  render() {
    return <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon active name="menu" onPress={() => this.props.navigation.navigate("DrawerOpen")} />
            </Button>
          </Left>
          <Body>
            <Title>D O</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flexDirection: "row", flex: 1, width: "100%", height: "100%" }} onStartShouldSetResponder={evt => {
            this._onSwipeBegin(evt.nativeEvent.locationX);
            return true;
          }} onResponderMove={evt => {
            this._onSwipe(evt.nativeEvent.locationX);
          }} onResponderRelease={() => {
            this._onSwipeEnd();
          }}>
          <Grid>
            <Col style={[styles.tab1, this.state.activeTab === 1 ? {} : styles.tab]}>
              <Text>Fixed width</Text>
            </Col>
            <Col style={[styles.tab2, this.state.activeTab === 2 ? {} : styles.tab]}>
              <Text>Fluid width</Text>
            </Col>
            <Col style={[styles.tab3, this.state.activeTab === 3 ? {} : styles.tab]}>
              <Text>Fluid width</Text>
            </Col>
            <Col style={[styles.tab4, this.state.activeTab === 4 ? {} : styles.tab]}>
              <Text>Fluid width</Text>
            </Col>
          </Grid>
          {/* <View style={{width: this.state[WIDTH_NAME[0]], height: "100%", backgroundColor: "#f1f"}}>
          <Text>1st</Text>
          </View>
          <View style={{width: this.state[WIDTH_NAME[1]], height: "100%", backgroundColor: "#ddd"}}>
          <Text>2nd</Text>
          </View>
          <View style={{width: this.state[WIDTH_NAME[2]], height: "100%", backgroundColor: "#fff"}}>
          <Text>3rd</Text>
          </View>
          <View style={{width: this.state[WIDTH_NAME[3]], height: "100%", backgroundColor: "#fe1"}}>
          <Text>4th</Text>
          </View> */}
        </View>
        <Footer style={{ backgroundColor: "#F8F8F8" }}>
          <View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
            {/* <View padder> */}
            <Text style={{ color: "#ec4c4c" }}>
              Have none account?
            </Text>
            {/* </View> */}
          </View>
        </Footer>
      </Container>;
  }
}

export default Home;
