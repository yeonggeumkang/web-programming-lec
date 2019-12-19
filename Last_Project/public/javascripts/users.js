$('#btn_users_list').on('click', function() {
    window.location.replace("/users/list");
});

//ajax 쓰는 버전
$('#btn_users_update').on('click', function() {
    $.ajax({
        url:'/users/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'name':$('#user_name').val(),
                             'login_id':$('#user_login_id').val(),
                             'login_pwd':$('#user_login_pwd').val(),
                             'email':$('#user_email').val(),
                             'uid':$('#uid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('수정에 성공!');
                window.location.replace('/users/list');
            } else {
                alert('수정에 실패!, 다시 시도!1');    
            }
        },
        error:function(err) {
            console.log(err);
            alert('수정에 실패!, 다시 시도!2');
        }
    });
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
  });