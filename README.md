#  Billboard Hot 100 Guessing Game
## To run

<ol>
    <li>From the /api directory, run the terminal command "npm start" to start the backend server -- and make sure all necessary libraries are installed (request, cheerio, and router).</li>
    <li>Navigate to the /billboard_game_app directory and run the same command to launch the React web application.</li>
    <li>Click on the songs in reverse order (clicking first the one you think is lowest on the charts) to reach the ranking you'd like to guess. You can reclick to change your guess as many times as you'd like.</li>
    <li>When you're ready to submit your guess, press the SUBMIT button. The real ranks of the songs will pop up as well as how many you got right. Reload the page to play again!</li>
</ol>

## Reflection

This project marked a couple of firsts for me: it was my first time writing a program with a separate frontend and backend, my first time using React (and Javascript), and my first time building an API. It was a fun way to dive in and build something achievable, fun, and challenging. The challenge spec and provided resources made it a satisfying balance of feeling supported and independent. 
The lesson I learned from this project, which is apparent in the structure of the program, is the importance of developing a clear blueprint before starting in on the actual coding. It was a big lesson in how important pushing state up the hirearchy is in making programs extensible, efficient, and readable (for the reviewer and the programmer!). This issue was magnified given my inexperience with many aspects of the assignment, and I'm confident it would be much improved in a second go-round. 
The biggest language-specific issue I ran into was passing JSON objects as props to child components, and then accessing them by value in functions in the children - this is why some of my code (particularly finding the correct ranking of the three songs) is done by brute-force.


## Primary resource
<ul>
    <li> https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial </li>
</ul>
