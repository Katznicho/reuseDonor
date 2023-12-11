import notifee from '@notifee/react-native';

class NotificationService {
    static displayLocalNotification = async (title, body) => {
        // Request permissions (required for iOS)
        await notifee.requestPermission()
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            vibration: true,
            //give  high priority to the notification
            //importance: 5,
            sound: 'default',
            soundURI: 'default',
            lightColor: '#FF0000',

        });
        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId: 'default',
                pressAction: {
                    id: 'default',


                },
                //console.log the data
                //data: { test: 'test' },

            },



        });
    }

}
export default NotificationService;

