
let getStorageData = function () {
  let userList = [];
  // webapiでデータ取得
  $.ajax({
    url: 'https://localhost:5001/api/User/List',
    type: 'get',
    dataType: 'json',
    async: false
  }).done(function (data) {
    if (data.status == 'success') {
      userList = data.resultData;
    }
  }).fail(function () {
    alert('error');
  });

  // // ストレージ読み込み
  // let userList = sessionStorage.getItem('userList');
  // if (userList == null) {
  //   // 配列初期化
  //   userList = [];
  // } else {
  //   // データが存在すれば、文字列からオブジェクトに変換
  //   userList = JSON.parse(userList);
  // }
  return userList;
};

let refleshRegistList = function () {

  $('#register').empty();
  $('#register').append(
    $('<ul />').addClass('nav').append(
      $('<li />').text('選択')
    ).append(
      $('<li />').text('アカウントID')
    ).append(
      $('<li />').text('パスワード')
    )
  );

  let userList = getStorageData();
  if (userList != null) {
    //userList = JSON.parse(userList);
    $.each(userList, function () {
      let user = this;
      //'<input type="checkbox" class="nav" value="アカウントID">')
      $('#register').append(
        $('<ul />').addClass('nav').append(
          $('<li />').append(
            $('<input />').attr('type', 'checkbox').val(user.user_id)
          )
        ).append(
          $('<li />').text(user.user_id)
        ).append(
          $('<li />').text(user.password)
        )
      );

    });
  }

};

let addFunc = function () {

  let userId = $('#userId').val();
  let password = $('#password').val();
  $('.user-message.user-userId label').text('');
  $('.user-message.user-password label').text('');

  // エラーチェック処理
  // 未入力の場合エラー
  let errorFlg = false;
  if (userId == '') {
    $('.user-message.user-userId label').text('未入力です');
    errorFlg = true;
  }
  if (password === '') {
    $('.user-message.user-password label').text('未入力です');
    errorFlg = true;
  }

  if (errorFlg == true) {
    return;
  }

  $('#confirm-user-id label').text($('#userId').val());
  $('#confirm-user-pw label').text($('#password').val());

  // OKボタンを表示する

  $('#input').hide();
  $('#confirm').show();
  $('#finish').hide();

};

let confirmFunc = function () {
  //---------------------------------------------
  // ストレージに入力データを保存する


  let storageData = getStorageData();

  // 追加データをjson形式にする
  let addData = {
    'userId': $('#userId').val(),
    'password': $('#password').val()
  };
  // 配列に追加
  storageData.push(addData);

  // オブジェクトを文字列にして保存
  sessionStorage.setItem('userList', JSON.stringify(storageData));

  //---------------------------------------------
  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();

};

let finishFunc = function () {
  //   finishFunc();
  $('#input').show();
  $('#confirm').hide();
  $('#finish').hide();

  refleshRegistList();

};

// ★古い処理のため削除
// let updatechecked = function() { 
//   // 選択したチェックボックスのアカウントIDを取得する。
//   let target = $('#register :checkbox:checked:first');
//   let checkedVal = target.val();

//   // アカウントIDからセッションストレージのデータを取得する
//   // ストレージ読み込み
//   // let userList = sessionStorage.getItem('userList');
//   // if (userList == null) {
//   //   // 配列初期化
//   //   userList = [];
//   // } else {
//   //   // データが存在すれば、文字列からオブジェクトに変換
//   //   userList = JSON.parse(userList);
//   // }

//   let userList = getStorageData();

//   // ストレージから削除する位置を取得
//   let updateIndex = -1;
//   $.each(userList, function (index) {
//     let user = this;
//     if (user.userId == checkedVal) {
//       updateIndex = index;
//       // 取得したデータを入力テキストに設定する。
//       $('#userId').val(user.userId);
//       $('#password').val(user.password);
//       return false;
//     }
//   });



//   // アカウントIDの入力テキストを非活性にする。
//   $('#userId').prop('disabled', true);

//   $('#input').show();
//   $('#confirm').hide();
//   $('#finish').hide();
// };

// ★userListを受け取り、見つかったindexを返却する。
let updatechecked = function (uList) {
  // 選択したチェックボックスのアカウントIDを取得する。
  let target = $('#register :checkbox:checked:first');
  let checkedVal = target.val();

  // アカウントIDからセッションストレージのデータを取得する
  // ストレージ読み込み
  // let userList = sessionStorage.getItem('userList');
  // if (userList == null) {
  //   // 配列初期化
  //   userList = [];
  // } else {
  //   // データが存在すれば、文字列からオブジェクトに変換
  //   userList = JSON.parse(userList);
  // }

  //let userList = getStorageData();

  // ストレージから削除する位置を取得
  let retIndex = -1;
  $.each(uList, function (index) {
    let user = this;
    if (user.user_id == checkedVal) {
      retIndex = index;
      // 取得したデータを入力テキストに設定する。
      $('#userId').val(user.user_id);
      $('#password').val(user.password);
      return false;
    }
  });

  // アカウントIDの入力テキストを非活性にする。
  $('#userId').prop('disabled', true);

  $('#input').show();
  $('#confirm').hide();
  $('#finish').hide();

  return retIndex;
};

// ★userList,updateIndexを受け取る
let updateadd = function (userList, updateIndex) {
  userList[updateIndex].password = $('#password').val();

  // オブジェクトを文字列にして保存
  sessionStorage.setItem('userList', JSON.stringify(userList));

  //---------------------------------------------
  $('#input').hide();
  $('#confirm').hide();
  $('#finish').show();
};
