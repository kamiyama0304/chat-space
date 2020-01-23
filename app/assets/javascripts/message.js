$(function(){
  function buildHTML(message){//buildHTMLでHTMLを組み立てる
    if ( message.image ){
      var html = 
          `<div class = "messages__message-list"data-message_id=${message.id}>
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
          <img src=${message.image}>`
        
      return html;
    }else{
      var html = 
          `<div class = "messages__message-list"data-message_id=${message.id}>
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
          </div>`
      return html;
    }
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
});