$('#btn_board_new').on('click', function() {
    window.location.replace("/board/register");
});

$('#btn_board_register').on('click', function() {
    $.ajax({
        url:'/board/register/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(),
                             'board_content':$('#board_content').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('저장에 성공!');
                window.location.replace('/board/list');
            } else {
                alert('저장에 실패!, 다시 시도!1');    
            }
        },
        error:function(err) {
            alert('저장에 실패!, 다시 시도!2');
        }
    });
});

$('#btn_board_list').on('click', function() {
    window.location.replace("/board/list");
});

$('#btn_users_list').on('click', function() {
    window.location.replace("/users/list");
});

/* 기존코드
$('#btn_board_update').on('click', function() {
    window.location.replace("/board/list");
});*/

//ajax 쓰는 버전
$('#btn_board_update').on('click', function() {
    $.ajax({
        url:'/board/update/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'board_title':$('#board_title').val(),
                             'board_content':$('#board_content').val(),
                             'bid':$('#bid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('수정에 성공!');
                window.location.replace('/board/list');
            } else {
                alert('수정에 실패!, 다시 시도!1');    
            }
        },
        error:function(err) {
            alert('수정에 실패!, 다시 시도!2');
        }
    });
});

$('#btn_board_delete').on('click', function() {
    $.ajax({
        url:'/board/delete/process',
        method:'POST',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'bid':$('#bid').val()}),
        success:function(data) {
            if(data.status == 'OK') {
                alert('삭제에 성공!');
                window.location.replace('/board/list');
            } else {
                alert('삭제에 실패!, 다시 시도!1');    
            }
        },
        error:function(err) {
            alert('삭제에 실패!, 다시 시도!2');
        }
    });
});
