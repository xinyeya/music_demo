$(document).ready(function() {
  // 获取标签
  const audio = $("#audio");
  const play = $(".play");
  const cover = $(".cover");
  const title = $("#title");
  const author = $("#author");
  const prev = $(".prev");
  const next = $(".next");
  var play_num = 0;

  // 如果缓存中没有音乐则请求
  if (sessionStorage.getItem('music') == null) {
    // 获取音乐数据
    const music = new Promise((resolve, reject) => {
      $.get(
          '/music',
          function(res) {
            resolve(res)
          }
      )
    });
    music.then(res=>{
      if (res.code !== 200) {
        alert('音乐加载错误')
      }else{
        console.log(res.data);
        // 存储音乐数据
        sessionStorage.setItem('music', JSON.stringify(res.data));
      }
    });
  }


  // 获取到数据添加音乐链接
  let musicList = JSON.parse(sessionStorage.getItem('music'));

  console.log(musicList);

  // 设置属性和内容
  setting_music(play_num, false);

  // 播放音乐
  play.on('click', function () {
    // 判断是否正在播放
    if (audio[0].paused) {
      // 播放音乐
      audio[0].play();
      // 切换图标
      $(".play>svg").replaceWith('<svg t="1609325494810" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1131" width="200" height="200"><path d="M928 335.1c-22.6-53.4-54.9-101.3-96.1-142.5-41.2-41.2-89.1-73.5-142.5-96.1-55.3-23.4-114-35.2-174.5-35.2S395.7 73.1 340.4 96.5c-53.4 22.6-101.3 54.9-142.5 96.1-41.2 41.2-73.5 89.1-96.1 142.5-23.4 55.3-35.2 114-35.2 174.5s11.9 119.2 35.2 174.5c22.6 53.4 54.9 101.3 96.1 142.5 41.2 41.2 89.1 73.5 142.5 96.1 55.3 23.4 114 35.2 174.5 35.2s119.2-11.9 174.5-35.2c53.4-22.6 101.3-54.9 142.5-96.1 41.2-41.2 73.5-89.1 96.1-142.5 23.4-55.3 35.2-114 35.2-174.5S951.3 390.4 928 335.1zM514.9 877.9c-203.1 0-368.3-165.2-368.3-368.3 0-203.1 165.2-368.3 368.3-368.3 203.1 0 368.3 165.2 368.3 368.3 0 203-165.2 368.3-368.3 368.3z" p-id="1132"></path><path d="M413.8 316.6c-22.1 0-40 17.9-40 40v306c0 22.1 17.9 40 40 40s40-17.9 40-40v-306c0-22.1-17.9-40-40-40zM616 316.6c-22.1 0-40 17.9-40 40v306c0 22.1 17.9 40 40 40s40-17.9 40-40v-306c0-22.1-17.9-40-40-40z" p-id="1133"></path></svg>');
      // 显示信息
      $(".play_info").stop().animate({top:"-70px"});
      // 封面旋转
      $(".cover").addClass("cover-active");
    }else{
      // 暂停音乐
      audio[0].pause();
      // 切换图标
      $(".play>svg").replaceWith('<svg t="1609320855076" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1297" width="200" height="200"><path d="M923.5 336.9c-22.6-53.4-54.9-101.3-96.1-142.5-41.2-41.2-89.1-73.5-142.5-96.1C629.7 75 571 63.1 510.5 63.1S391.3 75 336 98.3c-53.4 22.6-101.3 54.9-142.5 96.1-41.2 41.2-73.5 89.1-96.1 142.5-23.4 55.3-35.2 114-35.2 174.5s11.9 119.2 35.2 174.5c22.6 53.4 54.9 101.3 96.1 142.5 41.2 41.2 89.1 73.5 142.5 96.1 55.3 23.4 114 35.2 174.5 35.2s119.2-11.9 174.5-35.2c53.4-22.6 101.3-54.9 142.5-96.1 41.2-41.2 73.5-89.1 96.1-142.5 23.4-55.3 35.2-114 35.2-174.5s-11.9-119.2-35.3-174.5z m-413 542.8c-203.1 0-368.3-165.2-368.3-368.3 0-203.1 165.2-368.3 368.3-368.3 203.1 0 368.3 165.2 368.3 368.3 0 203.1-165.2 368.3-368.3 368.3z" p-id="1298"></path><path d="M647.4 341.8c-12.4-7.1-27.6-7.1-40 0l-233.8 135c-12.4 7.1-20 20.4-20 34.6 0 14.3 7.6 27.5 20 34.6l233.8 135c6.2 3.6 13.1 5.4 20 5.4s13.8-1.8 20-5.4c12.4-7.1 20-20.3 20-34.6v-270c0-14.3-7.6-27.5-20-34.6z m-60 235.3l-113.8-65.7 113.8-65.7v131.4z" p-id="1299"></path></svg>');
      // 显示信息
      $(".play_info").stop().animate({top:"0px"});
      // 封面停止旋转
      $(".cover").removeClass("cover-active");
    }
  });

  // 上一曲
  prev.on('click', function () {
    play_num+=1;
    if (play_num <= 0) {
      play_num = musicList.length-1;
    }else if(play_num >= musicList.length) {
      play_num = 0;
    }
    setting_music(play_num);
  });
  // 下一曲
  next.on('click', function () {
    play_num+=1;
    if (play_num <= 0) {
      play_num = musicList.length-1;
    }else if(play_num >= musicList.length) {
      play_num = 0;
    }
    setting_music(play_num);
  });

  // 监听音乐是否播放结束
  audio.on('ended', function () {
    setting_music(play_num);
  });

  // 设置属性和内容
  function setting_music(play_num, is_play=true) {
    console.log(play_num);
    cover.css({'background-image':`url('${musicList[play_num].image}')`});
    audio.attr('src', musicList[play_num].file_path);
    title.text(musicList[play_num]['title']);
    author.text(musicList[play_num]['author']);
    if (is_play) {
      audio[0].play();
    }
  }
});
