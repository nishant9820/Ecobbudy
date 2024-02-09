import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/mainScreens/HomeScreen";
import CustomDrawer from "./components/navigation/CustomDrawer";
import Loader from "./Loader";
const Drawer = createDrawerNavigator();
const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Loader}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
