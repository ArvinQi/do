import * as React from "react";
import { View } from "react-native";
// import Swiper from "react-native-swiper";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, List, ListItem, Footer } from "native-base";

import styles from "./styles";
export interface Props {
  navigation: any;
  list: any;
}
export interface State { }
class Home extends React.Component<Props, State> {
  _onPressButton() {
    // console.log();
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon
                active
                name="menu"
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              />
            </Button>
          </Left>
          <Body>
            <Title>D O</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {/* <Swiper style={styles.wrapper}>
            <View onResponderMove={(e) => { console.log(e); }} style={styles.slide1}>
              <List>
                {this.props.list.map((item, i) => (
                  <ListItem
                    key={i}
                    onPress={() =>
                      this.props.navigation.navigate("BlankPage", {
                        name: { item },
                      })}
                  >
                    <Text>{item}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
            <View style={styles.slide2}>
              <List>
                {this.props.list.map((item, i) => (
                  <ListItem
                    key={i}
                    onPress={() =>
                      this.props.navigation.navigate("BlankPage", {
                        name: { item },
                      })}
                  >
                    <Text>{item}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
            <View style={styles.slide3}>
              <List>
                {this.props.list.map((item, i) => (
                  <ListItem
                    key={i}
                    onPress={() =>
                      this.props.navigation.navigate("BlankPage", {
                        name: { item },
                      })}
                  >
                    <Text>{item}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
            <View style={styles.slide4}>
              <List>
                {this.props.list.map((item, i) => (
                  <ListItem
                    key={i}
                    onPress={() =>
                      this.props.navigation.navigate("BlankPage", {
                        name: { item },
                      })}
                  >
                    <Text>{item}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
          </Swiper> */}
        </Content>
        <Footer style={{ backgroundColor: "#F8F8F8" }}>
          <View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
            {/* <View padder> */}
            <Text style={{ color: "#ec4c4c" }}>Have none account? </Text>
            {/* </View> */}
          </View>
        </Footer>
      </Container>
    );
  }
}

export default Home;
