(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict

getchat();
async function getchat(){
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);
    data.forEach(function(data){
      console.log(data.answer);
      var tr = document.createElement('tr');
      var chatparent = document.querySelector('#chatparent');
  
      tr.innerHTML = `
                    <td>${data.date}</td>  
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.query}</td>
                    <td>${data.answer}</td>
                    <td>${data.sessionID}</td>                 
                    <td ><button class ='session option' value ="${data.sessionID}" onclick="conversation(this.value)"> view convo</button></td>  
                    `;
                    chatparent.append(tr);
    });
    $('#dataTable').DataTable({
      "bInfo" : false,
      "order": [[ 0, "desc" ]]
      // columnDefs: [{
      //     width: '10%',
      //     targets: 0
      // }],
    });

}

// conversation code
async function conversation(value){
  const response = await fetch('data.json');
  const data = await response.json();
  function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }
  // console.log(value);

  const convo = data.filter(function(convo){
    if(convo.sessionID == value ){
      return true;
    }
  });
  convo.sort(sortByProperty('id'));
  // console.log(convo);
  convo.forEach(function(data){
    // console.log(data);
    
    var convoparent = document.querySelector('#convoparent');
    var answer = document.createElement('li');
    var query = document.createElement('li');
    answer.setAttribute('class',"in");
    query.setAttribute('class',"out");
                  query.innerHTML = `
                  <div class="chat-body">
                  <div class="chat-message">
                    <p>${data.query}</p>
                  </div>
                </div>
        
                      `;
                      answer.innerHTML = `
                      <div class="chat-body">
                      <div class="chat-message">
                        <p>${data.answer}</p>
                      </div>
                    </div>
            
                          `;

                      convoparent.append(query);
                      convoparent.append(answer);

                      $('#chatpop').show();
                      $('.shut').on('click', function(){
                        $('#chatpop').hide();
                        $('.in').remove();
                        $('.out').remove();                  
                      })
    
  })

}