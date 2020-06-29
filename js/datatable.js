$('#add').on('click',function(){
    $('#popup').show();
})

// close btn
$('.closebtn').on('click',function(e){
    let content = e.target.parentNode.parentNode
    content.style.display = "none";
    
})