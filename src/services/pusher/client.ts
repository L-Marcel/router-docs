import Pusher from "pusher-js";

export default class RealtimeClient {
  static pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  });

  static event<T>(channel: string, event: string, callback: (data: T) => void) {
    const c = this.pusher.subscribe(channel);
    c.bind(event, callback);
  };
  static removeChannel(channel: string) {
    this.pusher.channels.remove(channel);
  };
};