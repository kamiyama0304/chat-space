$(function(){
  function buildHTML(message){//buildHTMLでHTMLを組み立てる
    if ( message.image && message.content){
      var html = 
          `<div class = "messages__message-list"data-message-id="${message.id}">
              <div class="list-name">
                ${message.user_name}
                <div class="list-name__time">
                ${message.created_at}
                </div>
              </div>           
            </div>
            <div class="list-message">
              <p class="list-message__content">
                ${message.content}
              </p>
            </div>
          </div>
            <img src=${message.image}>`
    }else if(message.content){
      var html = 
          `<div class = "messages__message-list" data-message-id="${message.id}">
              <div class="list-name">
                ${message.user_name}
                <div class="list-name__time">
                ${message.created_at}
                </div>
              </div>
            
            <div class="list-message">
              <p class="list-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
    }else if(message.image){ 
      var html =
          `<div class = "messages__message-list"data-message-id="${message.id}">
              <div class="list-name">
                ${message.user_name}
                <div class="list-name__time">
                  ${message.created_at}
                </div>
              </div>           
                
              <div class="list-message">
                <img class = 'list-message__image' src = "${message.image}">
              </div>
          </div>`
            
    }
    return html;
  }

  $("#new_message").on("submit",function(e){
    e.preventDefault()//非同期通信を行うために、preventDefault()を使用してデフォルトのイベントを止めます。
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('form')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}); 
        $('.send-form').prop('disabled', false);
      })
      .fail(function(){
        alert("メッセージ送信に失敗しました");
      });
  });


  var reloadMessages = function(){
    last_message_id = $('.messages__message-list:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",     
      type: 'get',
      dataType: 'json',     
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
      var insertHTML = '';
      $.each(messages, function(i,message){
        insertHTML += buildHTML(message)
      });
      
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }

});