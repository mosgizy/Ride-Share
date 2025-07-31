
interface NotificationI{
  title: string,
  body: string;
  data: any
}

export const sendPushNotification = async (expoToken: string,otherInfo:NotificationI) => {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: expoToken,
        title: otherInfo.title,
        body: otherInfo.body,
        sound: 'default',
        data: otherInfo.data
      }),
    });
  } catch (error) {
    console.log(error);
  }

  
};
