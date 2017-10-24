import * as React from "react";
import { Image } from "react-native";
import { Container, Content, Header, Body, Button, Text } from "native-base";
import styles from "./styles";
export interface Props {
	loginForm: any;
	onLogin: Function;
}
export interface State {}
class Login extends React.Component<Props, State> {
	render() {
		return (
			<Container>
				<Header style={{ height: 200, borderBottomWidth: 0, backgroundColor: "#FFF" }}>
					<Body style={{ alignItems: "center" }}>
						{/* <Title>ReactNativeSeed.com</Title> */}
						{/* <Icon name="flash" style={{ fontSize: 104 }} /> */}
						<Image style={styles.logo} source={require('../../../../assets/do.png')}></Image>
						{/* <View padder>
							<Text style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }} />
						</View> */}
					</Body>
				</Header>
				<Content style={styles.content} padder>
					{this.props.loginForm}
					<Button style={styles.btn} block onPress={() => this.props.onLogin()}>
						<Text>Login</Text>
					</Button>
				</Content>
				{/* <Footer style={{ backgroundColor: "#F8F8F8" }}>
					<View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
						<View padder>
							<Text style={{ color: "#000" }}>Made with love at </Text>
						</View>
						<Image
							source={{ uri: "https://geekyants.com/images/logo-dark.png" }}
							style={{ width: 422 / 4, height: 86 / 4 }}
						/>
					</View>
				</Footer> */}
			</Container>
		);
	}
}

export default Login;
 