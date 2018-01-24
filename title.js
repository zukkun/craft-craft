function rendertitle() {
  var titleimage = Asset.images["title"];
  //仮
  ctx.drawImage(titleimage, 0, 0);
  ctx.fillStyle = "#7fffd4";
  ctx.fillStyle = "aquamarine";
  ctx.font = "30px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("はじめから", 225, 500);
  ctx.fillText("つづきから", 225, 600);
}
function onClickTitle(x, y) {
  //はじめから
  if (200 < x && x < 400 && 500 < y && y < 550) {
    itemData = {};
    recipe = [];
    craftbox = [];
    craftResult = null;
    //アイテム一覧画面に行く
    gameMode = "story"
    Audio.playMusic("musics/BGM.mp3", true);
  }
  //つづきから
  if (200 < x && x < 400 && 600 < y && y < 650) {
    load()
    yubi = 1
    //アイテム一覧画面に行く
    gameMode = "gamemain"
    Audio.playMusic("musics/BGM.mp3", true);
  }
}
