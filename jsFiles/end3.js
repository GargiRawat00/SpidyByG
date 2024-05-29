

let character=localStorage.getItem('character');
//console.log(recentScore);

let titleimage=document.getElementById('titleimage');
switch(character)
{
    case "Draco Malfoy":
        titleimage.src="../images/5.png";
        break;
    case "Harry Potter":
        titleimage.src="../images/4.png";
        break;
    case "Rubeus Hagrid":
        titleimage.src="../images/8.png";
        break;
    case "Hermione Granger":
        titleimage.src="../images/7.png";
        break;
    case "Ronald Weasely":
        titleimage.src="../images/6.png";
        break;
    case "Lord Voldemort":
        titleimage.src="../images/9.png";
        break;
}