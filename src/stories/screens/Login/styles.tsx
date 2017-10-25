import { Dimensions, StyleSheet } from "react-native";

const deviceHeight = Dimensions.get("window").height;

const styles: any = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#FBFAFA",
	},
	shadow: {
		flex: 1,
		width: undefined,
		height: undefined,
	},
	bg: {
		flex: 1,
		marginTop: deviceHeight / 1.75,
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 30,
		bottom: 0,
	},
	logo: {
		width: 200,
		height: 200,
		marginTop: 16,
	},
	input: {
		marginBottom: 20,
	},
	btn: {
		marginTop: 20,
		backgroundColor: "rgba(0,0,0, .6)",
	},
	content: {
		backgroundColor: "#FFF",
		marginTop: 0,
	},
});
export default styles;
