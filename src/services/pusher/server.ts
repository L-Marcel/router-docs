import Pusher from "pusher";

export default class RealtimeServer {
  static pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  });

  static async trigger<T>(channel: string, event: string, data: T) {
    this.pusher.trigger(channel, event, data).catch(err => console.log(err.message));
  };
};