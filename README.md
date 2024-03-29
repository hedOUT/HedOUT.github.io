## Let’s HedOUT and get ahead!
Social goal setting app that creates accountability, motivation and connectedness within international friend circles using Hedera Hashgraph.  

## Demo Video
[![Watch the video](img/web-preview.png)](https://www.youtube.com/watch?v=yttYT2QplwM&feature=emb_title)

 
Visit the website: https://hedout.github.io/

### Idea
Gamification of hitting goals by harnessing the power of social groups and raising the stakes with cryptocurrency.

### Inspiration
Cryptocurrencies such as Hashgraph are not widely used by the public even though they have benefits such as transparency and virtually no transaction fees. Therefore, we wanted to make Hashgraph more accessible and introduce people to cryptocurrency through a goal setting application with some friendly competition.

### What it does
HedOUT uses Hashgraph transactions to encourage users to achieve goals through challenges with their friends. Users compete in challenges to gain money from each other, which is relative to their rank in the competitions. Our app allows users to acquaint themselves with Hashgraph while simultaneously completing to accomplish, in this case, fitness goals. 

### Goals
* Increase the well-being of those impacted by Covid by connecting them with friends and family across the world
* Use gamification and real world incentives to promote productivity in a positive way
* To make crypto and advanced tools more widely accepted and accessible

### How we built it
It's a bootstrap mobile web application with the Hedera Hashgraph SDK.

### Challenges we ran into
The one that caused the most grief was integrating the Hedera Hashgraph SDK into our vanilla Javascript app, specifically packaging our scripts to be able to run in the browsers. We also struggled with refining our idea and choosing an area of focus, as there were so many potential applications to branch out on. 

### Accomplishments and GREEN
We are proud of implementing account creation and user-to-user transactions with Hedera Hashgraph. By using this we can leverage the HBar wallet to track transactions between users, provide seamless and transparent interactions as well as take advantage of the low transaction rate to encourage crypto exposure. All in a user friendly mobile app!
In addition, we are excited about using an internationalized paperless finance management system, while also shining a green light to go get that healthier, environmentally-friendlier lifestyle. Oh and the app is green too. That's green on green on green on green!

### What we learned
Communication, Time management and teamwork are instrumental to the completion of a project, especially in a virtual setting where half ur team was 3 hours ahead!

### What's next for HedOUT
* Make the app more accessible to remote areas to provide higher potential of interaction among the users, ultimately increasing access to technology.
* Support Social media integration: IG - users can include fundraising goals in their bio (think BLM), iMessage games, FB message games to challenges friend groups towards a goal
* Machine learning integration to learn from the user’s trends and suggest new ways of exercising and hitting targeted goals. 

## Usage

### Basic Usage

After installation, run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.  
  
Run `node wallet.js` to try a transaction in the terminal. Be careful it is possible to run out of currency!

#### Gulp Tasks

* `gulp` the default task that builds everything
* `gulp watch` browserSync opens the project in your default browser and live reloads when changes are made
* `gulp css` compiles SCSS files into CSS and minifies the compiled CSS
* `gulp js` minifies the themes JS file
* `gulp vendor` copies dependencies from node_modules to the vendor directory

You must have npm installed globally in order to use this build environment.

Devpost: https://devpost.com/software/hedout?ref_content=user-portfolio&ref_feature=in_progress

