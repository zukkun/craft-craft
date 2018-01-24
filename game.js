var itemPage = 0;
var yubi = 0;
function rendergame() {
  // 背景
  ctx.drawImage(Asset.images["back"], 0, 0);

  // アイテム一覧
  ctx.fillStyle = "#D9D9D9";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      ctx.fillRect(100 + x * 100, 350 + y * 100, 100, 100);
      ctx.strokeRect(100 + x * 100, 350 + y * 100, 100, 100);
    }
  }
  var i = 0;
  for (itemid in itemData) {
    var count = i - itemPage * 16;
    if (count < 0 || count >= 16) {
      i++;
      continue;
    }
    var x = count % 4;
    var y = Math.floor(count / 4);

    var imageName = masterlitem[itemid].imageName;
    var image = Asset.images[imageName];
    ctx.drawImage(image, 117 + 100 * x, 370 + 100 * y, 70, 70);

    // アイテム名表示
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(masterlitem[itemid].name, 105 + x * 100, 355 + y * 100);

    // 個数表示
    ctx.font = "bold 26px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText(itemData[itemid], 190 + 100 * x, 420 + 100 * y);

    i++;
  }

  // アイテム一覧ページ切り替えボタン
  if (itemPage > 0) {
    ctx.fillStyle = "#F4CCCC";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(15, 525);
    ctx.lineTo(60, 500);
    ctx.lineTo(60, 550);
    ctx.lineTo(15, 525);
    ctx.fill();
    ctx.stroke();
  }
  if (itemPage < Math.floor((Object.keys(itemData).length - 1) / 16)) {
    ctx.fillStyle = "#F4CCCC";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(585, 525);
    ctx.lineTo(540, 500);
    ctx.lineTo(540, 550);
    ctx.lineTo(585, 525);
    ctx.fill();
    ctx.stroke();
  }
  //レシピ
  ctx.fillStyle = "#F4CCCC";
  ctx.strokeStyle = "black";
  ctx.fillRect(400, 285, 100, 50);
  ctx.strokeRect(400, 285, 100, 50);
  ctx.fillStyle = "navy";
  ctx.font = "30px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("レシピ", 405, 295);

  // つぼ
  ctx.fillStyle = "#A4C2F4";
  ctx.stroleStyle = "black";
  ctx.lineWidth = 4;
  ctx.fillRect(15, 50, 215, 250);
  ctx.strokeRect(15, 50, 215, 250);
  var tsubo = Asset.images["tsubo"];
  ctx.drawImage(tsubo, 15, 50, 215, 250);

  //タイトル
  ctx.fillStyle = "#F4CCCC";
  ctx.strokeStyle = "black";
  ctx.fillRect(290, 285, 100, 50);
  ctx.strokeRect(290, 285, 100, 50);
  ctx.fillStyle = "navy";
  ctx.font = "23px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("タイトル", 295, 295);

  //指

  if (yubi == 0) {
    ctx.fillStyle = "#ffff00";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(200, 260);
    ctx.lineTo(230, 315);
    ctx.lineTo(255, 280);
    ctx.lineTo(200, 260);
    ctx.fill();
    ctx.stroke();
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("タップ", 70, 245);
  };
  if (yubi == 1) {
    ctx.font = "40px monospace";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("無限", 75, 210);
  }
  //クラフトボックス
  ctx.fillStyle = "#D9D9D9";
  ctx.strokeStyle = "black";
  for (var y = 0; y < 2; y++) {
    for (var x = 0; x < 2; x++) {
      ctx.fillRect(250 + 100 * x, 50 + 100 * y, 100, 100);
      ctx.strokeRect(250 + 100 * x, 50 + 100 * y, 100, 100);
    }
  }
  for (var i = 0; i < craftbox.length; i++) {
    var x = i % 2;
    var y = Math.floor(i / 2);
    var itemid = craftbox[i]
    var imageName = masterlitem[itemid].imageName;
    var image = Asset.images[imageName];
    ctx.drawImage(image, 265 + 100 * x, 65 + 100 * y, 70, 70)

    // アイテム名表示
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(masterlitem[itemid].name, 255 + x * 100, 55 + y * 100);
  }
  //クラフト結果
  ctx.fillStyle = "#FFF2CC";
  ctx.strokeStyle = "black";
  ctx.fillRect(485, 100, 100, 100);
  ctx.strokeRect(485, 100, 100, 100);
  if (craftResult != null) {
    var imageName = masterlitem[craftResult].imageName;
    var image = Asset.images[imageName];
    ctx.drawImage(image, 500, 115, 70, 70);

    // アイテム名表示
    ctx.font = "bold 14px monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(masterlitem[craftResult].name, 490, 105);

  }
}

var craftbox = [];
var craftResult = null;
//------------------クリック処理--------------------------------------------------------------------------

function onClickgame(x, y) {
  //ツボ
  if (15 < x && x < 230 && 50 < y && y < 300) {
    //ツボ音楽
    Audio.play("tuboMusic")
    for (var id in masterlitem) {
      var masterItem = masterlitem[id]
      if (masterItem["rare"] == 1) {
        additem(masterItem["id"])
        yubi = 1;
        //アイテム
      }
    }
    save();
  } else {
    itemloop : for (var itemx = 0; itemx < 4; itemx++) {
      var left = 100 + 100 * itemx;
      var right = left + 100;
      for (var itemy = 0; itemy < 4; itemy++) {
        var top = 350 + 100 * itemy;
        var bottom = top + 100;
        if (left < x && x < right && top < y && y < bottom) {
          if (craftbox.length >= 4) {
            break itemloop;
          }
          index = itemy * 4 + itemx + itemPage * 16;
          var i = 0;
          for (var id in itemData) {
            if (i == index) {
              craftbox.push(id);
              Audio.play("tuboMusic")
              craftResult = craft(craftbox);
              itemData[id]--;
              if (itemData[id] == 0) {
                delete itemData[id];
                if (itemPage > Math.floor((Object.keys(itemData).length - 1) / 16) && itemPage > 0) {
                  itemPage--;
                  Audio.play("tuboMusic")
                }
              }
            }
            i++
          }

        }
      }
    }

  }

  for (var crafty = 0; crafty < 2; crafty++) {
    var top = 50 + 100 * crafty;
    var bottom = top + 100;
    for (var craftx = 0; craftx < 2; craftx++) {
      var left = 250 + 100 * craftx;
      var right = left + 100;
      if (left < x && x < right && top < y && y < bottom) {
        var index = crafty * 2 + craftx;
        if (index >= craftbox.length) {
          continue;
        }
        additem(craftbox[index]);
        craftbox.splice(index, 1);
        craftResult = craft(craftbox);

      }
    }
  }

  // アイテム一覧ページ遷移
  if (15 <= x && x <= 60 && 500 <= y && y <= 550) {
    if (itemPage != 0) {
      itemPage--;
    }
  }
  if (540 <= x && x <= 585 && 500 <= y && y <= 550) {
    if (itemPage < Math.floor((Object.keys(itemData).length - 1) / 16)) {
      itemPage++;
    }
  }
  if (400 <= x && x <= 500 && 285 <= y && y <= 335) {
    gameMode = "recipe";
  }
  if (290 <= x && x <= 390 && 285 <= y && y <= 335) {
    gameMode = "title";
  }
  //クラフト結果
  if (485 <= x && x <= 585 && 100 <= y && y <= 200) {
    if (craftResult != null) {
      additem(craftResult);
      craftbox.splice(0, craftbox.length);
      save(); //オートセーブ

      //エンディング
      endItem = craftResult;
      if (endItemList.includes(endItem)) {
        Audio.playMusic("musics/end.mp3", true)
        gameMode = "end";
      }
      craftResult = null;

    }
  }
};

// デバッグ：ホバーバイク素材入手
/*function getHoverBikeSources() {
  additem("35");
  additem("28");
  additem("29");
  additem("10");
}

window.addEventListener("keydown", function(e) {
  // "H"キーを押したらホバーバイク素材ゲット
  if (e.keyCode == 72 || e.key == "h") {
    getHoverBikeSources();
  }
});*/
