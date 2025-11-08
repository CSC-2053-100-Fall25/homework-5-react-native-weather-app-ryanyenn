// This is the root layout file that defines the navigation stack and screen options for the weather app. It's the same as what I had done in the labs so no changes were made here. We use react navigation.
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
    {/* Main Screen */}
<Stack.Screen
    name="index"
    options={{
      title: "Ryan Yen's Weather App",
      headerStyle: {
        backgroundColor: '#de2525ff',
      },
      headerTintColor: '#ffffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }}
  />
  {/* Detail Screen */}
  <Stack.Screen
    name="cityDetail"
    options={{
      title: "City Details",
      headerStyle: {
        backgroundColor: '#de2525ff',
      },
      headerTintColor: '#ffffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    }}
  />
</Stack>
);
}