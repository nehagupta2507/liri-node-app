# liri-node-app
 LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
To install these npm packages, cd into the folder, then run
npm install 

#Technologies Used
1. Node.js
2. JavaScript
3. Bands in Town API (via twitter npm module)
4. Spotify API (via spotify npm module)
5. OMDb API (via request npm module)

#Code Explanation
1. Authentication keys for spotify are stored in "keys.js", and we are exporting its contents to the main "liri.js" file
2. What this app does depends on what the user selects from the drop down, and there are 4 main functions: 
    * prints latest concert details 
    * Spotify lookup for a song, 
    * OMDb lookup for a movie, and 
    * read command and query from another file
The program makes a request to the Bands in town API that is limited by parameters,and selectively output using console.log
The program also makes a request to the Spotify API, and we get back a JSON object that includes everything we need (artist(s), song, preview link, and album)
The program also makes a HTTP request to the OMDb API using the request NPM module, and we get back a JSON object that includes everything we need (title, year, IMDb rating, language, etc.)
The program also reads from a file called "random.text" and executes the command and query found there using string and array methods
Appropriate comments and error-checking has been added