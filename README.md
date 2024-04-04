# Project Title

## Overview

My app's core is a search function for looking up movies from different streaming services all in one place. While the user will not be able to actually watch anything on the platform, they will be able to tell the app whcich streaming services they own, and then the searchbar will include only those services in the search.

### Problem

There have been many times in the past where I've looked up a movie on Netflix and found that it wasn't on there and then proceed to login in to every other one of my streaming services just to search the same movie, only to find it wasn't on any of them. The purpose of this app is to remove that process and make a one-stop to replace it.

### User Profile

The target audience is anyone from teenagers to people well into adulthood who use a streaming service to watch content, primarily people in their 20's. It is meant to start out as a website but also be adjusted into a mobile app (will not be done for the demo). My app will have to have clear and concise, short instructions for any navigation. It is important that things are easy and quick to read. This app isn't designed for the user to spend hours on. Targetted to spend 1~20 minutes depending on why they are there.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

 -> Searchbar - Core feature
 -> Selection of streaming services - Will be viewable as a filter component
 -> An equivalent to MyList or something similar to mark down movies to watch
 -> Movie details Page for a selected movie
 -> User login - username, password, email
 -> Comments and adding comments to individual movies
 -> Database?????

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Definites -> React, HTML, SASS, Node

Maybes -> mySQL, knex

### APIs

Reelgood API - https://data.reelgood.com/api-docs/api-documentation/

Possibly- Utelly, Streaming Availablity, OTT Details

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Home page/Large searchbar. This will be the main and core screen of the project. The searchbar and dropdown take up the majority of the screen. Selecting a movie navigates to movie details page

There is a profile icon in the header which leads to the profile page, containing user information.

Collection page is equivalent to mylist/favorites on other sites. Will consist of movie components that will display a summary when hovered over. Can be clicked on to redirect to the movie page.

Movie details page. Contains in depth information on specific movie. Also possible to comment or add to collection on the page.

Comments page Used for each movie. Shows the list of comments for the movie as well as adding a new comment

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

#### Home Page
![Home Page](./mockups/HomePage.png)

#### Searchbar
![Home Page w/ Searchbar](./mockups/Searchbar.png)

#### Collection Page
![Collection Page](./mockups/Collection.png)

I'm not very good at designing things by hand. I've been having much greater success with shifting colors using css. Definitely a lot more to add.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out. 

Will use mySQL for users and comments. Users will have a foreign key to comments and a list of ids for movies in their collection. 

Comments will have a correlating user and a foreign key for the movie

Still debating between storing the movie data in my database or using the data from the GET requests.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

/home
/home?s={movieId}
/profile
/collection
/:movieId
/:movieId/comments

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

I will have authorization, most likely using passport.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

Have the mockups and database done by this Saturday night 4/6
Search functionality finished by 4/9
Profile/User Auth 4/11
Collection 4/13
Comments 4/14
Debugging 4/16

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

Video for the trailer of the movie

Filters for the search

More services than 3 or 4
