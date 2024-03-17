import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./screens/splashScreen/Splash";
import Onboarding from "./screens/onboarding/Onboarding";
import AppStack from "./AppStack";
import Account from "./screens/account/Account";
import CreateAccount from "./screens/account/CreateAccount";
import AllNews from "./news/AllNews";
import Walk from "./screens/walk more/Walk";
import ShopWisely from "./screens/shooping/ShopWisely";
import Payment from "./screens/shooping/Payment";
import UpdateUser from "./components/update/UpdateUser";
import { StripeProvider } from "@stripe/stripe-react-native";
import VolunteerMore from "./screens/volunteer/VolunteerMore";
import LocationDetails from "./components/volunteer/LocationDetails";
import Ticket from "./components/volunteer/Ticket";
import Challenges from "./screens/challenges/Challenges";
import Image from "./screens/challenges/Image";
import DonateMore from "./screens/donate/DonateMore";
import Leadboard from "./screens/leadboard/Leadboard";
import DonatePay from "./screens/donate/DonatePay";
import AI from "./screens/ai/AI";
import PlantTree from "./screens/planttree/PlantTree";
import PlantPay from "./screens/planttree/PlantPay";

LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const stack = createNativeStackNavigator();
const App = () => {
  return (
    <StripeProvider publishableKey="pk_test_51MBXXNSHJLr1jwGDmvepcylN5nJA4nHHIOdKhuVzgtVCYQms6zjLAXBhMQn6m5k69S6FXr46hnQHSng1rQO8BNEm00QRiJqfzx">
      <NavigationContainer>
        <stack.Navigator initialRouteName="Splash">
          <stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="OnboardingScreen"
            component={Onboarding}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="AppStack"
            component={AppStack}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="News"
            component={AllNews}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Update"
            component={UpdateUser}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Walk"
            component={Walk}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Volunteer"
            component={VolunteerMore}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Location"
            component={LocationDetails}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Ticket"
            component={Ticket}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Challenges"
            component={Challenges}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Image"
            component={Image}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="DonateMore"
            component={DonateMore}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="Leadboard"
            component={Leadboard}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="DonatePay"
            component={DonatePay}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="AI"
            component={AI}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="PlantTree"
            component={PlantTree}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="PlantPay"
            component={PlantPay}
            options={{ headerShown: false }}
          />
          <stack.Screen name="Account" component={Account} />
          <stack.Screen name="CreateAccount" component={CreateAccount} />
          <stack.Screen name="Eco-Shop" component={ShopWisely} />
        </stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
