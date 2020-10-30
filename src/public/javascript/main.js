$(function(){
 
    const socket= io();

  const  $messageForm= $('#message-form');
  const  $messageBox= $('#message');
  const  $chat= $('#chat');


  const nickForm = $(' #nick-form');
  const nickError = $(' #nick-error');
  const nickName = $(' #nickname');

  const $users = $("#usernames")

  nickForm.submit( e =>{
      e.preventDefault();
      socket.emit('new user', nickName.val(), data =>  {
        if(data){
            $('#nick-wrap').hide();
            $('#content-wrap').show();
        }else{
            nickError.html(`
            <div class ="alert alert-danger">
            
            Usuario ya existe
            
            </div>
            `)
        }
        nickName.val("");
      });
  })

  //message

  $messageForm.submit( e => {
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val(" ");
  });

  socket.on("new message", function(data){
      $chat.append(`<b>`+ data.nick + `</b>: `+ data.msg + `<br>`);
  })

  socket.on('usernames', data => {
      let html ='';
      for(let i=0; i<data.length;i++){
          html += `<p><i class ="fa fa-user"></i> ${data[i]}</p>`
      }
      $users.html(html); 
  })

})