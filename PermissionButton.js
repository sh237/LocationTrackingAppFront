import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Alert
} from "react-native";
import * as Haptics from "expo-haptics";
import { Linking } from "expo";
import * as Permissions from "expo-permissions";

function PermissionButton(props) {
  const { type, title } = props;
  const [isLoading, setLoading] = useState(false);
  const [isGranted, setGranted] = useState(false);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 50,
        marginVertical: 12
      }}
      disabled={isLoading}
      onPress={async () => {
        if (isGranted) {
          props.onPress && props.onPress();
          return false;
        }
        setLoading(true);
        const { status } = await Permissions.askAsync(Permissions[type]);
        setLoading(false);
        if (status === "granted") {
          setGranted(true);
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          setTimeout(props.onPress, 500);
        } else {
          // ユーザーが意図的にPermissionを不許可にしている場合
          // アラートを表示して設定画面に移動する
          Alert.alert(
            `${title}が無効になっています`,
            "設定画面へ移動しますか？",
            [
              {
                text: "キャンセル",
                style: "cancel"
              },
              {
                text: "設定する",
                onPress: () => {
                  Linking.openURL("app-settings:");
                }
              }
            ]
          );
        }
        console.log(type, status);
      }}
    >
      <View
        style={[
          props.style,
          {
            position: "relative",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isGranted ? "#3cbe8d" : "#3cb3ff",
            borderRadius: 25
          }
        ]}
      >
        {isLoading ? (
          <ActivityIndicator
            color="#ffffff"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 15,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          />
        ) : null}
        {isGranted ? (
          <Text
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              lineHeight: 50,
              top: -2,
              left: 15,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            &#x1f44d;
          </Text>
        ) : null}
        <Text
          style={{
            color: "#ffffff",
            fontWeight: "bold"
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PermissionButton;