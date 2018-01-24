function renderItemList() {
  for (itemid in itemData) {
    var itemImage = masterItemData[itemid].image;
    ctx.drawImage(itemImage, x, y);
  }
}

function onClickItemList(x, y) {
  var i = 0;
  for (itemid in itemData) {
    var itemX = (アイテム一覧の左の位置);
    var itemY = (アイテム一覧の上の位置);
    if (itemX < x && x < itemX + (ボタンの幅) && itemY < y && y < itemY + (ボタンの高さ)) {
      //itemidのボタンを押した
    }
    i++
  }
  gamemode = "gameMode"
}
