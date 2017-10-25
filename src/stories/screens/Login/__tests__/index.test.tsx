import React from "react";
import Login from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const onLogin = jest.fn();
const goRegister = jest.fn();
const loginForm = React.Component;

it("renders correctly", () => {
	const tree = renderer.create(<Login onLogin={onLogin} loginForm={loginForm} goRegister={goRegister} />).toJSON();
	expect(tree).toMatchSnapshot();
});
