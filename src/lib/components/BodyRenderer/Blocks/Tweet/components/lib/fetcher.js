import parser from "./parser";


export default async function parseTweet(tweetJSON, fetcher) {
    if (!tweetJSON) return undefined;

    const { data, includes } = tweetJSON;

    let parsedText = await parser(data.text, data, includes.media);
    let tweet = {
        ...data,
        parsedText: parsedText,
        users: includes.users,
        media: includes.media
    }

    let promises = [];
    if (data && data.referenced_tweets) {
        data.referenced_tweets.forEach((tweet) => {
            promises.push(fetcher(tweet.id));
        });
    }

    if (promises.length > 0) {
        const referencedTweets = await Promise.all(promises);
        if (data.referenced_tweets[0].type === "retweeted") {
            tweet = referencedTweets[0];
        } else {
            tweet.replies = referencedTweets;
        }
    }

    return tweet;
}