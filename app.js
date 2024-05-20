let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn_X = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was clicked");
        if (turn_X)
        {
            box.style.color = "black";
            box.innerHTML = "X";    // PTR
            turn_X = false;
        }
        else
        {
            box.style.color = "red";
            box.innerHTML = "O";    // PTR
            turn_X = true;
        }
        box.disabled = true;
        count++;
        let isWinner = check_Winner();

        if (count == 9 && !isWinner)
            gameDraw();
    })
})


const check_Winner = () =>
{
    for (let arr of winPatterns)
    {
        // console.log(arr[0], arr[1], arr[2]);
        // console.log(boxes[arr[0]], boxes[arr[1]], boxes[arr[2]]);
        // console.log(
        //     boxes[arr[0]].innerText,    // PTR
        //     boxes[arr[1]].innerText,
        //     boxes[arr[2]].innerText,

        let pos1_val = boxes[arr[0]].innerHTML;
        let pos2_val = boxes[arr[1]].innerHTML;
        let pos3_val = boxes[arr[2]].innerHTML;

        if (pos1_val != "" && pos2_val != "" && pos3_val != "")
        {
            if (pos1_val === pos2_val && pos2_val === pos3_val)
            {
                console.log("Winner", pos1_val);
                showWinner(pos1_val);
                return true;
            }
        }
    }
}


const showWinner = (winner) =>
{
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");  // This is used to remove the style "hide" when we get the winner
    DisableBoxes();
}


const DisableBoxes = () =>
{
    for (let box of boxes)
    {
        box.disabled = true;
    }
}

const gameDraw = () =>
{
    msg.innerHTML = "Game is Drawed";
    msgContainer.classList.remove("hide");
    DisableBoxes();
}

const resetGame = () =>
{
    turn_X = true;
    count = 0;
    EnableBoxes();
    msgContainer.classList.add("hide"); // when new game is started the Winner message is hidden
}

const EnableBoxes = () =>
{
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerHTML = ""; // Reseting the Inner Html of boxes when the new game is started  
    }
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);