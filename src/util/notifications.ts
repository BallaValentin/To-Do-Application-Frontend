export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.error('This browser doesn`t supports notifications.');
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Sending notifications is allowed.');
  } else {
    console.log('Sending notifications is not allowed');
  }
}
