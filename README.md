# BunnyInc #NowPlaying
You can visit this project at https://167.99.161.158/ . The site will ask for your location, then pull tweets from your Area with #NowPlaying! **Any tweets created from this app will be posted from @BI_Kehran**

# Overview

This SPA was created utilizing ReactJS (for its flexibility and reusable component architecture). Custom APIs to communicate with various 3rd party technologies were created in PHP and hosted on Apache2. Below you can find a comprehensive list of the technologies used in this app and why they were chosen.

  - **React** was chosen because it allowed for a very flexible 'framework' with reusable components and HTML built into JS as opposed to some JS functionality built into HTML. This allowed for each component to handle its logic in a very isolated & uni-directional way. 
  - **PHP** has a wide variety of libraries and extensions which made the connection with the TwitterAPI much easier.
  - **Jquery** allowed me to create AJAX requests effortlessly and reference elements in a comfortable & familiar way.
  - **TwitterOAuth** This is PHP library to connect to the TwitterAPI
  - **react-twitter-widgets** opposed to creating my own custom twitter widgets this beautiful library helped me connect to twitters Oembed API, allowing me to embed official, functional, twitter cards into the application.



# Deployment
You can visit this project at https://167.99.161.158/ . The site will ask for your location, then pull tweets from your Area with #NowPlaying!
 - Install all required libraries and dependencies (Node, NPM, Composer, Curl)
 - Clone repo to Apache or PHP friendly server
 - Use NPM to build out the project
 - Move /build contents to public_html directory along with the /APIs & /Vendor folder
 - Check all file paths are correct and you're done! :) 

# Approach

When I initially viewed this challenge the first thing that popped into my head was ReactJS! Its **flexibility would still allow me to use other libraries** (or even frameworks for that matter) but **it's uni-directional approach to logic would allow me to create these very neat, isolated, OOP based components** that would do some logic, render an output, and pass data to its children.** 

As far as the TwitterAPI goes, **at first I tried using the StreamingAPI to get real-time updates but this turned out to be overkill and not really necessary**. In the beginning, I had even built out a Processing Queue and a Consumer to collect and consumer tweets in realtime with separate processes ( this was the server wouldn't be slowed down ). In the end, I simply **repeatedly call the SearchAPI every few minutes and update the UI if there any differences in our current data vs the new data we just pulled in.**

# Conclusion

Overall this project was loads of fun! **In total, the project took me about 25-30 work hours to complete.** Half of the time was spent on the collection of twitter data and best approaches for gathering new tweets, while the rest of the time was spent on design and UI. I actually really enjoyed scrapping twitter data and building out a small 'dashboard' to utilize it. The toughest part was deciding how / when twitter should be scrapped, but in the end, it was the simple solution that worked best.

# To-Do

 - Add feedback to the UI when a user creates a tweet using the navbar at the top of the pag
 - Fix "reset location" functionality when locational is already determined
