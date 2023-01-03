window.addEventListener("load", function(){
    truncateCardTitle();

})


function truncateCardTitle(){
    var cardList = document.getElementsByClassName("card-title");
    for(var i = 0; i < cardList.length; ++i){
        var text = cardList[i].innerHTML.trim();
        var newText = truncateString(text, 30);
        cardList[i].innerHTML = newText;
    }
}

function truncateString(str, num){
    if(str.length > num){
        return str.slice(0, num) + "...";
    }
    return str;
}