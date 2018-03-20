[heroku instance](https://vermillion.herokuapp.com/)

# Flash Card App (Team Vermillion)

## Overview

The Flash card app allows a user to enter items and matching answers, and then run through the items in a random order, waiting on each before displaying the answer, and then wait again to display the next random item.

## Purpose

The team project is intended to give experience:
* sharing a code base with other coders
* sharing responsibilities with other coders
* prioritizing and tracking issues (bugs and feature requests)
* dealing with changes in requirements

## Minimum Functional Requirements

The page allows the entry of any number of item/answer pairs (cards)
* An item is a string
* An answer is a string
* The team may choose any terminology to display to the user, it does not have to be item/answer/card
* The team may choose to add any additional fields to card
* The team may choose to have item/answer be interchangeable (such as learning a language in both directions)

The page allows the user to go through the list of cards in random order
* The page will display only the item and wait
* The team may choose if the app waits a specific period of time or waits for a user action
* The page will display both the item and the answer once the item-only time has ended (however that happens)
* The page will again wait after displaying both the item and the answer before moving on to the next random item
* The team may choose if the app waits a specific period of time or waits for a user action 
* The team may choose how to randomly pick the next item (example: Randomize the list, or pick a random item each time)

The page allows the user to edit a card
* The team chooses how to start an edit
* The team chooses the editing experience

The page allows the user to add cards when not going through a random list
* The team chooses how to indicate this
* The team chooses if they wish to allow additions while going through the list, or only when stopped

The page allows the user to start/stop showing cards
* The team chooses the interface

The page will assume it is being used by a single user
* No login
* This is one of the few restrictions on what you can add

The page will not have persistence beyond the service life
* i.e. I can load the page and add data repeated
* If I reload the page, the data entered is still displayed
* If the service(s) restart, the data is lost
* This is one of the few restrictions on what you can add

The page appearance
* Will have an attractive and intuitive UI
    * This is subjective so avoid ugly, avoid confusing
* Will display fine on a non-widescreen monitor
* Will display fine on a widescreen monitor
* Will display fine if the browser isn't full-screen
* Is not required to work for very small browser windows
* Is not required to work for mobile displays
* The team may choose support additional viewport sizes
* The team may choose to rearrange the layout based on viewport size


## Technical Requirements

The page will be a Single Page Application
* Meaning the user loads one HTML file and no additional page reload is required

The page will work in the latest Chrome
* The team may elect to have it work in other modern browsers

The page will be written using plain HTML/JS/CSS
* **Not** React (yet)
* Webservice code in NodeJS
* Webserver code in NodeJS
* No outside JS libraries 
    * Browserify may be used to bundle multiple JS files
    * Browserify usage must include source maps
    * Polyfills of JS standards, if needed, may use code from an external source 
* No outside CSS libraries (yet)

The project repository will follow common conventions.  In particular:
* The project can be full installed by cloning the repo and running `npm install` 
* The repo does not contain improper files, such as node_modules or IDE/OS-specific files

The project will use file structure practice required for this class.  In particular:
* lowercase filenames, except for JS files that represent classes
* .html, .js, and .css file extensions
* Project files not intended to be served are not available to web users
    * e.g. I cannot visit your webserver and see your package.json
* The project will use package.json 
* The team may decide what additional directories, if any, they want for their served files

The page will use HTML best practices as outlined in class and assignments.  In particular but not limited to:
* Use HTML tags in a semantic fashion (choice of tags, grouping of content)
* Indent when going to a newline inside a tag
    * html and body tags are not required to cause an indent
* Use kebab-case class attributes
* Avoid inline JS
* Avoid inline CSS
* Declare DOCTYPE html
* Do not use table tags for layout
* Do not use tags for layout due to the browser default rendering
    * Example: This means don't use `<p>` tags to line things up
* Do not use non-breaking spaces (nbsp) to create space
* Do not use `<br>` tags to create space
   
The page will use CSS best practices as outlined in class and assignments.  In particular but not limited to:
* kebab-case css class names
* indented rules 
* class names reflect what the class content represents, not how it should be displayed
    * e.g. `task-title` is fine, `red-bold` is incorrect
* Do not use the float property to create layout
* Avoid hacks
* Avoid browser-specific prefixes
* Do not create styling that contradicts web conventions
    * e.g. creating something that looks like a button is fine
    * e.g. having blue underlined text that is not a link is incorrect
    * e.g. Clickable items should have the appropriate mouse icon (cursor property)
* Avoid over-specifying CSS selectors
* Avoid dramatic style changes to entire tags
    * It's fine to have a rule for a tag that just sets the specifics without violating expectations
    * e.g. specifying the bottom margin for all `p` tags is fine
    * e.g. specifying that all `ul` are now horizontal is incorrect

The page will use JS best practices as outlined in class and assignments.  In particular but not limited to:
* No pollution of the global namespace
    * Explicit settings of limited global variables is permitted to expose self-written libraries
* Never use `var`
    * If Browserify generates `var`, this is fine
* Use `const` when possible, `let` when necessary
* No unnecessary String(), Object(), Array() etc uses
* Use whitespace to improve clarity
* Make your code skimmable as well as readable
* Use meaningful and helpful variable names and function names
* Use small functions
* Follow the Principle of Least Knowledge
* Use modern ES6 conventions
* Use fetch() instead of XHR or an external library
* All promises should have a catch() eventually
* No console.log() or other debugging messages visible when I run it

The JS is not required to have unit tests
* But it is not a bad idea

The page will communicate with at least one webservice written by the team
* The team may use additional services they write
* The services have no required paradigm (REST, GraphQL, whatever)
    * GET requests must be idempotent, however

## Design

The /admin/design directory of your repo is where you'll store any documentation of your design (if you have hand-written sketches, drop in some pictures from a cellphone).  Do not get overly complicated in the design at the start - just identify the general layout, what actions the user can take, and what the app does in reaction.

The goal of the initial design documentation is NOT to have everything perfect, or even good.  In fact, rough and general is ideal at this step.  You just need to have a shared basic understanding of what the app will do, and the experience of describing an actual app with a team will make our coverage later more meaningful.

Here are some samples of what I expect at different levels of effort.  Any of these would be acceptable, as would non-visual descriptions, lots of arrows, multiple images, whatever works for your team.

### Very Minimal Design sketch
* https://chetmhcid.files.wordpress.com/2014/02/imag1543-recovered.jpg

### Basic Design sketch
* http://cdn.designbeep.com/wp-content/uploads/2012/05/8.website-sketches.jpg
* http://speckycdn.sdm.netdna-cdn.com/wp-content/uploads/2011/05/wireframe-sketch-08.jpg

### Fancy Design sketch
* https://uploads.toptal.io/blog/image/138/toptal-blog-Notifeye.jpg

## Responsibilities

Fill in the /admin/roles.md file and list the expected "job" of each member of the team.  This is not a commitment of any kind, just an expectation.  We will use it later to match what really happened to this initial expectation.

## Delivery Milestones

This list will expand:

* Feb 19, 11:59 pm - Have the initial design design concept in the /admin/design/ directory.  Have the /admin/roles.md file filled in.
* Feb 26, 6:29 pm - Have JS, HTML, and CSS for both the front-end and the services in the /src/ directory (subdirectories are fine).  A package.json at your repo root should let me try the app with `npm install; npm start`.  The page should work well enough to be usable, but bugs are expected.
* Mar 5 - Spring Break.  No deadline, but you should make sure you'll be able to make the Mar 12 deadline.
* Mar 12 - To Be Announced
* Mar 12, 6:29 pm  - Bugs are expected to be corrected.  The requirements of *Added Requirements* and *Modified Requirements* are complete.  All of this is in your master branch.

## Ongoing Requirements

### Added Requirements

* Create a service call that returns an id that returns 1, 2, or 3.  Each call will return the number in the list after the previous number it sent, wrapping around to the beginning as needed.  So on the first call (from anywhere) it will return 1, and on the second call (from the same page or not) returns 2, then 3, then 1 again and so forth.  Do so as a POST, not a GET (be sure to understand why I'm saying that).
* The page will, when the page is loaded, call the above fake id service.  This will simulate a login - on page load the user is considered "logged in".  On page reload the user is considered "logged in" as a different user;
* The service may return this number inside whatever data structure you wish (e.g. it might return "2" or it could return "{ userId: 2 }")
* The page will let the user know what their id for this page load is (example: text in the header "Welcome User 2!") 

### Modified Requirements

* Each user can create a separate list of question/answer pairs
* Each user can choose to use (but not edit) the question/answer pairs of other users
    * The team can decide how to display the options, but User 1 should be able to use their own list of cards, and see if User 2 and User 3 have their own lists.  User 1 can then select one of those and will be able to run through that list of cards just like going through their own list.  User 1 cannot add/edit/delete any cards from the lists of other users.
* The page will make it obvious which list a user is going through.
* The user is able to switch between lists multiple times without reloading the page.
* Because the logged in user changes on reload, it will take a few reloads to view the page as the same user.  
    * Example: User 1 and User 2 each have a list, User 3 has not yet created a list.  
    * If the page loads and displays as user 1, that user can use their list, and can see that User 2 has a list.  
    * User 1 can go through their list, or go through User 2's list, and can use each a few times without page reload.  
    * User 1 can edit their own list, but cannot make any changes to User 2's list.   
    * On page reload the page displays as User 2, and defaults to using the user 2 list.  
    * User 2 can also see that User 1 has a list, and can use it without modification just as User 1 could with User 2's list
    * On another page reload the page will display as User 3, who can create their own list or use User 1's or User 2's lists.
    * One more page reload will display the page as User 1, who will see User 2's list as available along with User 3's list if it was created.
* The project MAY be in React, but does not have to be for the due date.  The projects will eventually be required to be in React.  This does not otherwise change the restrictions saying you cannot use outside JS or CSS libraries, which includes (for now) any React components that come from an outside source (Bootstrap, for example, is still forbidden).  Note that moving to React will require some changes - either the services will have to run on a different port than the React webpack-dev-server, yet allow the page to access it despite CORS, or you will have to have the webpack dev server manage some of the task.  The README **That is created by create-react-app, not this one** has some info on using a proxy configuration it has - you may, but are not required to, use this.  Make sure that `npm install`, `npm start` continues to work.  Do not 'eject' any create-react-app.

