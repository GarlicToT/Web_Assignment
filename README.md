# Web Application Assignment

- **Name:** Sun Rong
- **Major:** Artificial Intelligence
- **Student ID:** 50087363
- **GitHub:** [Sun Rong's GitHub](https://github.com/GarlicToT/Web_Assignment)

# Quickstart
## Option 1: Running Directly on Codio

If you are already in Codio Box, please follow the steps below:
1. cd

1. Install the project dependencies by running the following command:

    ```sh
    npm install
    ```

2. Once the installation is complete, start the project with:

    ```sh
    npm start
    ```

3. After the project starts, you can access it using the URL provided by Codio template.

## Option 2: Cloning from GitHub and Running Locally

1. Ensure you have Node.js installed on your machine. You can download it from [Node.js](https://nodejs.org/).
2. Clone the repository to your local machine using the following command:

    ```sh
    git clone https://github.com/GarlicToT/Web_Assignment.git
    ```
3. Navigate to the project directory:

    ```sh
    cd Web_Assignment
    ```

4. Install the project dependencies:

    ```sh
    npm install
    ```

5. Start the development server:

    ```sh
    npm start
    ```

6. Open your web browser and navigate to `http://127.0.0.1:3300/` to view the project.
# Table of Contents

- [Web Application Assignment](#project-title)
- [Quickstart](#quickstartdemo)
- [Table of Contents](#table-of-contents)
- [Structure Overview](#structure-overview)
- [Usage](#usage)
- [Development](#development)
- [Contribute](#contribute)
- [License](#license)

# Structure Overview
[(Back to top)](#table-of-contents)

File Structure:
```
  '    |-- config.js',
  '    |-- index.js',
  '    |-- package-lock.json',
  '    |-- package.json',
  '    |-- README.md',
  '    |-- router.js',
  '    |-- src',
  '        |-- data',
  '        |   |-- questions.json',
  '        |-- fonts',
  '        |   |-- COOPBL.TTF',
  '        |-- html',
  '        |   |-- basic_info.html',
  '        |   |-- hobby.html',
  '        |   |-- home_page.html',
  '        |   |-- main_page.html',
  '        |   |-- major_info.html',
  '        |   |-- quiz.html',
  '        |   |-- tabbar.html',
  '        |-- images',
  '        |   |-- background.png',
  '        |   |-- beads.jpg',
  '        |   |-- games.png',
  '        |   |-- gpt_avatar.png',
  '        |   |-- music.jpg',
  '        |   |-- my_photo.PNG',
  '        |   |-- quiz.PNG',
  '        |   |-- small_me.png',
  '        |-- scripts',
  '        |   |-- hobby.js',
  '        |   |-- major_info.js',
  '        |   |-- quiz.js',
  '        |   |-- tabbar.js',
  '        |-- style',
  '            |-- basic_info.css',
  '            |-- fonts.css',
  '            |-- hobby.css',
  '            |-- home_page.css',
  '            |-- main_page.css',
  '            |-- major_info.css',
  '            |-- quiz.css',
  '            |-- tabbar.css',
  ''
```

Web Structure
```sh
这里记得补个图
```
# Basic Design
[(Back to top)](#table-of-contents)
## Overview of the website
This website mainly consists of the following pages, **home page**, **main page**, **basic information page**, **major information page**, **hobby page** and **quiz application**, all tasks required in assignment and some extra work have been completed.

## Description of each page
### Home Page
The home page is a simple welcome page, consisting of a big  welcome svg and a button to enter the main page.

### Main Page
The main page contains a tab bar and a main content area. 
It provides quick  "About Me" to sections including **Basic Information**, **Major Information**, and **Hobby**. Additionally, there is an image and a button leading to the **quiz** section. The page design includes background imagery and dynamic effects.

### Basic Information Page
The Basic Information Page provides a brief introduction of the author and contains buttons to major information and hobby pages.

### Major Information Page
The Major Information Page presents the author's major information by simulating a ChatGPT-like interface. At the bottom of the page, there are buttons to the basic information and hobby pages.
To create a ChatGPT-like interface on the Major Info page, I used the following methods and code:
1. In the HTML, I created a container for displaying chat messages and added an input box with a send button.
2. Using JavaScript to dynamically generate and display chat messages:
    - Preset messages array
    - Create a function to display messages
    ```sh
    function typeMessage(message, element, callback) {
        let i = 0;
        const interval = setInterval(() => {
            element.innerHTML = message.substring(0, i + 1);
            i++;
            if (i >= message.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 10); // Adjust typing speed here
    }
    ```
    - Create a function to send messages

With these designs, users can input a preset question and receive automated responses. This design enhances interactivity and user experience on the page.

### Hobby Page
The Hobby Page displays the author's hobbies and an interactive color palette. Each color block in the palette represents a different hobby. When a user clicks on a color block, it expands to display detailed information.
Here is how 

# Challenges
[(Back to top)](#table-of-contents)
## Home page
The resource of the welcome svg is initially made by p5.js library by the author, which should wave actually. However, I researched for a long time and found it hard to handle p5.js in my project in a short time. So I can only download the svg and use it directly.

# Contribute
[(Back to top)](#table-of-contents)

# References
[(Back to top)](#table-of-contents)

1. The welcome SVG used in the home page is generated from [Yasai's website](https://wangyasai.github.io/waveFont/) 
2. Green Background generate from [MagicPattern](https://www.magicpattern.design/tools/mesh-gradients)