# **still-underground**

## **Reason Behind Choosing this Project**

The main reason why I chose this project is because it is something I would enjoy working on. Additionally, it wouldn't be too hard to implement.

## **Tech Stack**

The tech stack of the project is as follows:
- TypeScript (To add type annotations on top of vanilla JS)
- Node.js (To process server-side requests)
- Fauna (To store the fastest times)
  
## **Development Plans**

### ***Use of the MVC Pattern***

First and foremost, to make the code maintainable, I am planning to use the [Model-View-Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern.

The model, in this case, would include the player's stats and other information such as the part of the game he/she is in. The model will also be responsible for updating localStorage whenever its data changes (this can be achieved through some form of [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).

In this case, the controller would include the form inputs.

Finally, the view is just composed of the HTML and CSS.

### ***Other Features***
1. I plan to save the user's progress using localStorage with JSON.stringify.
2. I plan to use Fauna to show the fastest times that people have achieved on the game. The leaderboard will only include those who got the good ending of the game.
3. I plan to validate the user's input for some of the questions. For instance, I can trim the raw input and convert it to lower case to make it case insensitive.

## **Plot Summary**

You are a cop who has been tasked to investigate the recent *missing people* cases in your town. Rumors say that, in the mountains, there is a *basement* where a local artist named [Eve](https://en.wikipedia.org/wiki/Eve_(Japanese_singer)) keeps his animators and forces them to make music videos for him.

One day, Eve announced that he would be on tour for a festival named *HikiFes 2019*. You decided to take this opportunity to investigate the area and to confirm if the basement exists. You suspect that the missing people were trapped in this basement.

The investigation was going well until you suddenly fell into a hole! When you looked around, you saw multiple computers with animating software open. You look at the wall and see a poster...

Upon looking at the poster, you realize where you are: ***Eve's basement***.

Now, you realize what you must do. You must escape before Eve comes back and free the animators trapped in Eve's basement!

Will you choose the good ending and free all of the animators in Eve's basement, the neutral ending where only you escape, or the bad ending where you will be trapped in Eve's basement and forced to animate Eve's music videos forever?

*Disclaimer: Eve's basement is simply a work of fiction. No animators are trapped in Eve's basement in real life.*
## **References to Eve**

For those who do not know who [Eve](https://en.wikipedia.org/wiki/Eve_(Japanese_singer)) (the J-pop artist) is, I will explain some of the references I used here.

1. **Still Underground**. The title to the game is a reference to Eve's song [We're still Underground](https://www.youtube.com/watch?v=nBteO-bU78Y).
2. **Eve's Basement**. There is an inside joke in the community that Eve keeps his animators trapped inside his basement. The game is based on this concept.
3. **Falling into a Hole on a Mountain**. This is not an Eve reference and is instead an Undertale reference. In Undertale, the protagonist, Frisk, falls into a hole on Mt. Ebbot.
## **Sample Questions**

Note that every HTML snippet will be put inside a form element.

### ***Easy***

1. Which Eve song has the most listens on Spotify?

```HTML
    <select>
        <option>Dramaturgy</option>
        <option>Anoko Secret</option>
        <option>Kaikai Kitan</option>
        <option>Okinimesumama</option>
    </select>
```

### ***Medium***

1. Which of these songs is the opening of the anime *Mecha-ude*?
```HTML
    <select>
        <option>Ambivalent</option>
        <option>Yamiyo</option>
        <option>Leo</option>
        <option>Bubble</option>
    </select>
```
1. What is the name of the boy from *Inochi no Tabekata*? Give his full name and include only one space between words. Input your answer in Romaji (i.e. using English characters).
```HTML
   <input type="text" placeholder="Full name of the boy">
```
### ***Hard***

1. In which of these albums did Eve sing all of the songs on his own?
    
```HTML
    <select>
        <option>Oyasumi</option>
        <option>Kaizin</option>
        <option>Blue</option>
        <option>Otogi</option>
    </select>
```
2. Eve sang the song *World Domination* with other popular artists. In which festival did Eve sing this song? In what year did this festival occur? Do not include spaces.

```HTML
    <input type="text" placeholder="Name of the festival">
    
    <input type="number" placeholder="The year it occured">
```