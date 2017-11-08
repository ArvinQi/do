import { StyleSheet, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = SCREEN_WIDTH / 10;
const styles: any = StyleSheet.create({
	container: {
		// flexDirection: "row",
		backgroundColor: "#FBFAFA",
	},
	tab: {
		width: TAB_WIDTH
	},
	tab1: {
		backgroundColor: "#f1f"
	},
	tab2: {
		backgroundColor: "#ddd"
	},
	tab3: {
		backgroundColor: "#fff"
	},
	tab4: {
		backgroundColor: "#fe1"
	},
});
export default styles;
