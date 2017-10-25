import * as React from "react";
import { View, Image } from "react-native";
import { Container, Content, Footer, Button, Text } from "native-base";
import styles from "./styles";
export interface Props {
	loginForm: any;
	onLogin: Function;
	goRegister: Function;
}
export interface State { }
class Login extends React.Component<Props, State> {
	render() {
		return (
			<Container>
				<Content style={styles.content} padder>
					<View style={{ alignItems: "center" }}>
						<Image style={styles.logo} source={require("../../../../assets/do.png")}></Image>
					</View>
					{this.props.loginForm}
					<View>
						<Button style={styles.btn} block onPress={() => this.props.onLogin()}>
							<Text>Login</Text>
						</Button>
					</View>
				</Content>
				<Footer style={{ backgroundColor: "#F8F8F8" }}>
					<View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
						{/* <View padder> */}
							<Text style={{ color: "#ec4c4c" }}>Have none account? </Text>
							<Text onPress={() => this.props.goRegister()}>register now</Text>
						{/* </View> */}
					</View>
				</Footer>
			</Container>
		);
	}
}

export default Login;
