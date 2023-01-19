import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    };
};

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("Old fcmToken", fcmToken);

    if (!fcmToken) {
        try {
            let fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("new Token", fcmToken);
                await AsyncStorage.setItem("fcmToken", fcmToken);
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const NotificationService = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage => {
        console.log('Notification in', remoteMessage)
    });

    // Check whether an initial notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage && remoteMessage.data) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            };
        });
};


