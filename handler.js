// 'use strict';

// module.exports.create = async (event) => {
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({message: "Hello world"}),
  // };
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

const Twit = require('twit'); // this is how we import the twit package
const Sentiment = require('sentiment');


var T = new Twit({
    consumer_key:         'KLQp4ggkxNk4njKW4cHfEDJoH',
    consumer_secret:      'CcelPr22pLGV6beFfQhhOgHLewBXTMvz9Jbi5ncQQK30uwd7DS',
    access_token:         '1514255041544454145-Wul5tWWRfQ9RVVfKYawGUvnofOwW3X',
    access_token_secret:  'kp0w8TceEdvSKKtM2JAPu7Xrcq89W0G3vn5hyLnhENRev',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

 module.exports.create = async (event) => {
    try {
      var sentiment = new Sentiment();
      var params = {
        q: 'modi',
        count: 20
      } 
      
      let result = await T.get('search/tweets', params)
      let positive = 0
      let negative = 0
      for(let i=0;i<result.data.statuses.length; i++){
        // console.log(result.data.statuses[0]);
        var tweets = sentiment.analyze(result.data.statuses[i].text);
        if(tweets.score > 0){
          positive++
        }else{
          negative++
        }
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({good_tweets: positive, bad_tweets: negative, tweets:result.data.statuses}),
      };
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: JSON.stringify({data: error}),
      };    
    }
}
