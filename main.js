//変数 アイテムリスト
var masterlitem = {};
//モード
var gameMode = "title";
//所持データ
var itemData = {};
//解放レシピ
var recipe = [];
//エンドアイテム
var endItem = 0;
//エンドアイテムリスト
var endItemList = [];
//画面比率修正
var screenRatio;

window.addEventListener("DOMContentLoaded", init);

//初期化
function init() {
  canvas = document.getElementById("maincanvas")
  ctx = canvas.getContext("2d");

  // Canvasのサイズ調整
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  canvas.addEventListener("click", onClick);
  canvas.addEventListener("touchstart", onClick);
  //音楽読み込み
  Audio.init();

  //ｃｓｖの読み込み
  itemload(function() {
    Asset.registerByJsonFile("assets.json", function() {
      //登録完了
      Asset.loadAll(function() {
        //影絵の読み込み完了
        generateShadow()
        // ローディング表示を消して、Canvasを表示
        document.getElementById("loading_image").style.display = "none";
        canvas.style.display = "block";
        sortRecipeId()
        endingItem()

        // ゲーム開始
        Audio.playMusic("musics/Honky_Tonky.mp3", true);
        requestAnimationFrame(update);
      });
    });
  });
}

/**
 * Canvasのサイズ調整
 */
function resizeCanvas() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  var pageRatio = pageWidth / pageHeight;
  var canvasRatio = canvas.width / canvas.height;

  if (pageRatio < canvasRatio) {
    // ページの幅比率がCanvasの幅比率より小さい
    screenRatio = pageWidth / canvas.width;
    var canvasStyleHeight = canvas.height * screenRatio;
    canvas.style.width = pageWidth + "px";
    canvas.style.height = canvasStyleHeight + "px";
    canvas.style.marginLeft = "0";
    canvas.style.marginTop = "calc((100vh - " + canvasStyleHeight + "px) / 2)";
  } else {
    // ページの高さ比率がCanvasの高さ比率より小さい
    screenRatio = pageHeight / canvas.height;
    var canvasStyleWidth = canvas.width * screenRatio;
    canvas.style.width = canvasStyleWidth + "px";
    canvas.style.height = pageHeight + "px";
    canvas.style.marginLeft = "calc((100vw - " + canvasStyleWidth + "px) / 2)";
    canvas.style.marginTop = "0";
  }
}

//ｃｓｖからアイテムデータの読み込み
function itemload(onload) {
  var item = new XMLHttpRequest();
  item.open("GET", "Pitem.csv", true);
  item.send(null);
  item.onreadystatechange = function() {
    if (item.readyState == 4) {
      var inst = item.responseText;
      var itemList = inst.split("\n");
      itemList.shift();
      itemList.forEach(function(line) {
        if (!line) {
          return;
        }
        var itemData = line.split(",")
        var Item = {
          "id": itemData[0],
          "rare": parseInt(itemData[1]),
          "name": itemData[2],
          "imageName": itemData[3],
          "recipe": itemData[5].trim()
            ? itemData[5].split("+").map(function(recipe) {
              return recipe.trim();
            })
            : []
        }
        if (Item["id"] != "") {
          masterlitem[itemData[0]] = Item;
        }
      });
      onload();
    }
  }
}
//クラフト処理
function craft(srcItems) {
  itemLoop : for (var id in masterlitem) {
    var item = masterlitem[id];
    var recipe = item["recipe"];
    if (recipe.length == 0) {
      continue;
    }
    if (recipe.length != srcItems.length) {
      continue;
    }
    recipe.sort();
    srcItems.sort();
    for (var i = 0; i < recipe.length; i++) {
      if (recipe[i].trim() != srcItems[i].trim()) {
        continue itemLoop;
      }
    }
    return item["id"];
  }
  return null;
}
//レシピ解放データ入力
function unlockrecipe(id) {
  // レシピに追加
  if (!recipe.includes(id)) {

    recipe.push(id);
    recipe.sort();
    //解放音楽
    if (id > 13) {
      Audio.play("recipeMusic")
    }
  }
}

//所持データ入力
function additem(id) {
  if (!itemData.hasOwnProperty(id)) {
    itemData[id] = 0;
  }
  itemData[id]++;
  unlockrecipe(id);
}
//ロード
function load() {
  var loadData = JSON.parse(localStorage.getItem("savedata"));
  itemData = loadData.itemData;
  recipe = loadData.recipe;
}
//セーブ
function save() {
  var saveData = {
    itemData: itemData,
    recipe: recipe
  };
  localStorage.setItem("savedata", JSON.stringify(saveData));
}
//フレーム更新
function update() {
  rendar();
  requestAnimationFrame(update);
}
//描画
function rendar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (gameMode) {
    case "title":
      //タイトル
      rendertitle();
      break;
    case "story":
      renderStory();
      break;
    case "gamemain":
      //ゲーム
      rendergame();
      break;
    case "recipe":
      //レシピ
      renderRecipe();
      break;
    case "end":
      //エンド
      renderEnd();
      break;
  }
}

//アイテム一覧
function rendarlist() {
  for (itmeld in itemData) {
    var itemlmag = masterlitem[itemlod].image;
    ctx.drawlmage(itemlmage, 100, 200);
  }
}

//クリックイベントが発生したら各画面のクリック処理に渡す
function onClick(event) {
  var x;
  var y;
  if (event.changedTouches) {
    var touch = event.changedTouches[0];
    x = touch.clientX - canvas.offsetLeft;
    y = touch.clientY - canvas.offsetTop;
  } else {
    x = event.offsetX == undefined
      ? event.layerX
      : event.offsetX;
    y = event.offsetY == undefined
      ? event.layerY
      : event.offsetY;
  }

  // クリック座標を、Canvasのスケールに合わせる
  x /= screenRatio;
  y /= screenRatio;

  switch (gameMode) {
    case "title":
      onClickTitle(x, y);
      break;
    case "story":
      onClickStory(x, y);
      break;
    case "gamemain":
      onClickgame(x, y);
      break;
    case "recipe":
      onClickRecipe(x, y);
      break;
    case "end":
      onClickEnd(x, y);
      break;
  }

  event.preventDefault();
}

// iOS Safariでスクロールの"伸び"を抑制
function preventScroll(event) {
  event.preventDefault();
}
window.addEventListener("touchmove", preventScroll, false);
window.addEventListener("touchend", preventScroll, false);
window.addEventListener("gesturestart", preventScroll, false);
window.addEventListener("gesturechange", preventScroll, false);
window.addEventListener("gestureend", preventScroll, false);
