# Assassins

This is a web app for the popular game "[Assassins](http://en.wikipedia.org/wiki/Assassin_(game))," where players compete to eliminate each other using mock weapons in an attempt to be the last one surviving.

**Assassins** (working title), is the solution for both organizers *and* players to have a better experience playing the game.  With a host of robust and intuitive features, we hope Assassins will become the defacto solution looked to for running an assassins game.

## Development

### Prerequisites

 - [Node.JS](http://nodejs.org/)
   - Needed for backend and installing other dependencies with [npm](https://www.npmjs.org/)
 - [Ruby](https://www.ruby-lang.org/)
   - Used for SASS style compilation (install ruby with [rbenv](https://github.com/sstephenson/rbenv) to save sanity if you're on a UNIX based system; [rubyinstaller](http://rubyinstaller.org/) works for Windows)
   - Install [SASS](http://sass-lang.com/install) is used to compile our CSS stylesheets
 - [MongoDB](http://www.mongodb.org/downloads)
   - You'll need mongoDB to be installed and have the `mongod` process running.
 - [Bower](http://bower.io/)
   - A package manager for the web
 - [Grunt](http://gruntjs.com/)
   - A JavaScript task runner that automates a bunch of development tasks

#### Getting setup
In order to start [contributing](#contributing), you'll need to clone the repository and get all project dependencies installed.  Luckily, this process is made a lot easier with helpful tools like npm and bower.

 1. Clone the repository to your local computer

  `git clone https://github.com/asusoda/Assassins.git` to your desired location on your computer.

 2. Install dependencies with `npm` and `bower`

  Simply run `npm install` and `bower install` inside the root folder of the repo you just cloned.  This will install code libraries and packages to your computer.

 3. Start up Grunt and MongoDb

  Run `grunt serve` to start up the local webserver to view the site and make sure you start the database with running `mongodb`.

#### Project Structure
TODO

## Contributing
This project is run by ASU's Software Developers Association ([SoDA](http://sodaasu.com/)), but we'd love contributions from anyone!  After getting the project setup from the above guide, you should be ready to run your local development environment and start making contributions.

In general, the `master` branch is our production-ready code, and in-development features should be developed on their own respective branches until they are merged back in to `master` after code review and testing.

### Coding guidelines
We'd like to keep this project clean and simple to understand for any developer coming in to contribute, with the goal is to make it look as if only one person used the same style throughout.  In order to achieve this, we follow these code style guidelines:

 - JavaScript: [idiomatic.js](https://github.com/rwaldron/idiomatic.js)
 - HTML: [code-guide](https://github.com/mdo/code-guide) & [wtf-html-css](https://github.com/mdo/wtf-html-css) is a good read
 - CSS/SASS: [GitHub CSS Styleguide](https://github.com/styleguide/css)

> Every line of code should appear to be written by a single person, no matter the number of contributors.

----------

#### Project Lead

 - Jack Ketcham ([github](http://github.com/jketcham) / [twitter](http://twitter.com/_jket))

#### Contributors

 - Could be you?!

## License
The MIT License (MIT)

Copyright (c) 2014 asusoda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



