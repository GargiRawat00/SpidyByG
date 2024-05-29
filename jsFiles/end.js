

let recentScore=localStorage.getItem('recentScore');
//console.log(recentScore);
let finalscore=document.getElementById('finalscore');
let titleimage=document.getElementById('titleimage');
if(recentScore<=40)
    {
        titleimage.src="../images/1.png";
    }
else if(recentScore<=80)
    {
        titleimage.src="../images/2.png";
    }
    else
    {
        titleimage.src="../images/3.png";
    }
finalscore.innerText=recentScore;