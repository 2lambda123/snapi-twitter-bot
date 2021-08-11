import Twitter, { ResponseData } from "twitter";
import { Types } from "./Enums";

class TwitterClient {
  private client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY ?? "",
    consumer_secret: process.env.CONSUMER_SECRET ?? "",
    access_token_key: process.env.ACCESS_TOKEN_KEY ?? "",
    access_token_secret: process.env.ACCESS_TOKEN_SECRET ?? "",
  });

  sendTweet(
    type: Types,
    title: string,
    newsSite: string,
    url: string
  ): Promise<ResponseData> | void {
    const tweetText = `New ${type} from ${newsSite}: ${title} - ${url} #space #spaceflight #news`;

    if (process.env.DEBUG) {
      return console.log("DEBUG!", tweetText);
    } else {
      try {
        return this.client.post("statuses/update", { status: tweetText });
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export const twitterClient = new TwitterClient();
