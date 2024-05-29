

let nv=document.getElementsByClassName('nv');
let flag=true;
function dropdown()
{
    if(flag)
    {
        nv[0].classList.remove('wd');
        nv[0].classList.add("dd");
        flag=false;
    }
    else
    {
        nv[0].classList.remove("dd");
        nv[0].classList.add("wd");
        flag=true;
    }
    
}