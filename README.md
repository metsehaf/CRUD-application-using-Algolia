# CRUD application using Algolia

This application is built to assist planners and dispatchers search student names, plan routes, add new students, edit existing student/route profiles and view route directions using google maps API. The CRUD functionalites included in this app are GET, UPDATE and ADD. The delete option was not added due to administrative reasons but is commented out and can be implemented by uncommenting it in [student.html](student.html). We implemented all codes on the front-end, this poses security risks as we are dealing private student locations and information, however we chose to write the code on the clien-side because we were collaborating across company branches using a local network and was not accessible to the public on the internet. We suggest you use Node.js or Python as a back end to implement the same functionalities as it is robust and secure.

  - The search bar is powered by Algolia, it displays student information with their locations dispayed with street-view. Users are able to visualize students location using street-view or can launch to google maps for a better view of student location.
  - Route attributes are fetched from Algolia using the Algolia's GET METHOD
  - Users can see route directions within the app on Jquery-UI dialog/modal using google maps directions API.
  - Users are also able to launch route directions from within the app to google using map action by URL-Encoding all start, end and waypoints.

# Documentation!

  - We used [Algolia](https://www.algolia.com/)'s application API for crud functionalities and search API for search functionalities. For our search bar templating and display,we used autocomplete.js which can be reference from a CDN or downloaded from [NPM](https://www.npmjs.com/). However, you can use instant.js for more elaborate search template and pagination if you want. 
  *****Note: don't use Application id on your front-end code unlesss you work on a local network such our case.
  - We use [google maps direction api](https://developers.google.com/maps/documentation/directions/intro) to create our route direction, putting this on client side code is not advisable as anyone with a little knowhow of chrome console can copy and use your API key in their project. 
  - [Jquery UI](https://jqueryui.com/) was used for tool-tip and our Add studnent button, we initially wanted Jquery UI's icons, however the stylesheet was not supported to modify the icons, but it is really useful, so use it if you want to.
  - [Jquery](https://jquery.com/) was itself used to traverse the dom as vanilla Javascript became daunting and tedious to complete our project in a short time. 
 
# Running the App

    - Just fork the repsitory and download all the HTML, CSS and JS files, it is pretty straightforward and add your algolia app-id and API's.
    
# Limitations

 - One of the things you will note when using this app is that if you want to create many route, you will end up having numerous HTML files which is not good for the performance of your app. If you are able to use a templating engine such as [liquid](https://shopify.github.io/liquid/), [handlebar.js](http://handlebarsjs.com/) or [Mustache.js](https://mustache.github.io/), you will be better off. For instance, let say you were using a back-end language such as Python, you can create custom html tempelate for all your CRUD functionalities which you can launch from your main .py file and display the data using [FLASK micro-framework](http://flask.pocoo.org/) and [jinja](http://jinja.pocoo.org/docs/2.10/) for tempelating.
 
# Author
Girum Hagos
 
