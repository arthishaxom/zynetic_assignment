import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme, StyleSheet } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#fafffb",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Products" }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "Product Details",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ededed",
    borderRadius: 4,
    marginBottom: 8,
  },
});
