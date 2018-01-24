var recipePage = 0;
var shadowImages = {};
//アイテム表示用
var sortItemIds = [];

//表示順(レア度)
function sortRecipeId() {
  sortItemIds = Object.keys(masterlitem);
  sortItemIds.sort(function(a, b) {
    var rareA = masterlitem[a].rare
    var rareB = masterlitem[b].rare
    a = parseInt(a);
    b = parseInt(b);

    if (rareA < rareB) {
      return -1;
    } else if (rareA > rareB) {
      return 1;
    } else {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    }
  });

}
//影画像生成
function generateShadow() {
  Object.keys(masterlitem).map(function(itemId) {
    return {
      id: itemId,
      image: convertShadowImage(Asset.images[masterlitem[itemId].imageName])
    };
  }).forEach(function(shadowData) {
    shadowImages[shadowData.id] = shadowData.image;
  });
}
//影絵生成
function convertShadowImage(image) {
  var canvas = document.createElement("canvas");
  //imageのサイズにcanvasを変更
  canvas.width = image.width;
  canvas.height = image.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 0; //赤
    data[i + 1] = 0; //緑
    data[i + 2] = 0; //青
    //アルファ値は変更しない
  }
  ctx.putImageData(imageData, 0, 0)
  var shadowImage = new Image();
  shadowImage.src = canvas.toDataURL();
  return shadowImage;
}

function renderRecipe() {
  // 背景
  ctx.drawImage(Asset.images["back"], 0, 0);

  ctx.textAlign = "left";

  // ページ番号
  ctx.fillStyle = "black";
  ctx.font = "bold 40px monospace";
  ctx.textBaseline = "top";
  var pageText = (recipePage + 1) + " / " + (Math.floor(Object.keys(masterlitem).length / 5) + 1);
  ctx.fillText(pageText, 50, 30);

  // レシピアイテムの表示
  var masterItemIds = sortItemIds;
  for (var i = 0; i < 5; i++) {
    if (recipePage * 5 + i >= masterItemIds.length) {
      continue;
    }
    var showId = masterItemIds[recipePage * 5 + i];
    var item = masterlitem[showId];

    // アイテム背景
    ctx.fillStyle = "#D9D9D9";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.fillRect(30, 100 + 110 * i, 100, 100);
    ctx.strokeRect(30, 100 + 110 * i, 100, 100);

    // レシピ背景
    for (var j = 0; j < item.recipe.length; j++) {
      ctx.fillRect(160 + 110 * j, 100 + 110 * i, 100, 100);
      ctx.strokeRect(160 + 110 * j, 100 + 110 * i, 100, 100);
    }

    // 「=」記号
    if (item.recipe.length > 0) {
      ctx.font = "30px monospace";
      ctx.fillStyle = "white";
      ctx.fillText("=", 137, 140 + 110 * i);
    }

    // アイテムアイコン
    if (recipe.includes(showId)) {
      // レシピ開放している
      var image = Asset.images[item.imageName];
      ctx.drawImage(image, 45, 115 + 110 * i, 70, 70);
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = "black";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // アイテム名
      ctx.fillText(masterlitem[showId].name, 35, 105 + 110 * i);

    } else {
      // レシピ開放していない

      // 「？」表示
      ctx.drawImage(shadowImages[showId], 45, 115 + 110 * i, 70, 70);
      ctx.textBaseline = "top";
      ctx.font = "30px monospace";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.strokeText("？", 65, 135 + 110 * i);
      ctx.fillStyle = "white";
      ctx.fillText("？", 65, 135 + 110 * i);

    }
    // レシピ
    for (var j = 0; j < item.recipe.length; j++) {
      var recipeItemId = item.recipe[j];
      var recipeItem = masterlitem[recipeItemId]
      //アイテム一部開放
      if ((recipe.includes(recipeItemId) && recipeItem.rare != 1) || recipe.includes(showId)) {
        var recipeImage = Asset.images[recipeItem.imageName];
        ctx.drawImage(recipeImage, 175 + 110 * j, 115 + 110 * i, 70, 70);
        ctx.font = "bold 14px monospace";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(masterlitem[recipeItemId].name, 165 + 110 * j, 105 + 110 * i);

      } else {
        ctx.drawImage(shadowImages[recipeItemId], 175 + 110 * j, 115 + 110 * i, 70, 70);
        ctx.textBaseline = "top";
        ctx.font = "30px monospace";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.strokeText("？", 195 + 110 * j, 135 + 110 * i);
        ctx.fillStyle = "white";
        ctx.fillText("？", 195 + 110 * j, 135 + 110 * i);
      }
    }
  }

  // ページ切り替えボタン
  ctx.fillStyle = "#F4CCCC";
  if (recipePage != 0) {
    ctx.beginPath();
    ctx.moveTo(300, 20);
    ctx.lineTo(350, 60);
    ctx.lineTo(250, 60);
    ctx.lineTo(300, 20);
    ctx.fill();
    ctx.stroke();
  }
  if (recipePage + 1 < Object.keys(masterlitem).length / 5) {
    ctx.beginPath();
    ctx.moveTo(300, 720);
    ctx.lineTo(350, 680);
    ctx.lineTo(250, 680);
    ctx.lineTo(300, 720);
    ctx.fill();
    ctx.stroke();
  }

  // 戻るボタン
  ctx.fillStyle = "#FFE599";
  ctx.stroleStyle = "black";
  ctx.fillRect(400, 700, 150, 50);
  ctx.strokeRect(400, 700, 150, 50);
  ctx.fillStyle = "black";
  ctx.font = "30px monospace";
  ctx.textAlign = "left";
  ctx.fillText("戻る", 443, 708);
}

function onClickRecipe(x, y) {
  // 上ボタン
  if (250 <= x && x <= 350 && 20 <= y && y <= 60) {
    if (recipePage != 0) {
      recipePage--;
    }
  }
  // 下ボタン
  if (250 <= x && x <= 350 && 680 <= y && y <= 720) {
    if (recipePage + 1 < Object.keys(masterlitem).length / 5) {
      recipePage++;
    }
  }

  // 戻るボタン
  if (400 <= x && x <= 550 && 700 <= y && y <= 750) {
    gameMode = "gamemain";
  }
}
