function renderEnd() {
  ctx.save();
  ctx.globalAlpha = textAlpha + 0.01;
  if (endItem == 65) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("「ホバーバイクが", 40, 100);
    ctx.fillText("　完成したから", 40, 170);
    ctx.fillText("　他の人たちを", 40, 240);
    ctx.fillText("　探しに行くよ」", 40, 310);

    var image = Asset.images["hobabaiku"];
    ctx.drawImage(image, 150, 450, 300, 300);

  }
  if (endItem == 66) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("「ニートに", 40, 100);
    ctx.fillText("　就職、", 40, 170);
    ctx.fillText("　希望中」", 40, 240);
    var image = Asset.images["pasokonn"];
    ctx.drawImage(image, 150, 450, 300, 300);
  }
  if (endItem == 45) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("「ロボットが", 40, 100);
    ctx.fillText("　完成した。", 40, 170);
    ctx.fillText("　ロボットに", 40, 240);
    ctx.fillText("　働かせよう」", 40, 310);

    var image = Asset.images["robotto"];
    ctx.drawImage(image, 150, 450, 300, 300);
  }
  if (endItem == 58) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("「I　　LOVE　", 40, 170);
    ctx.fillText("　　ラ〇ライブ！」", 40, 240);

    var image = Asset.images["terebi"];
    ctx.drawImage(image, 150, 450, 300, 300);
  }
  if (endItem == 51) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("「布団から", 40, 100);
    ctx.fillText("　出たく", 40, 170);
    ctx.fillText("　ないでござる", 40, 240);
    ctx.fillText("　(´_ゝ｀)」", 40, 310);

    var image = Asset.images["beddo"];
    ctx.drawImage(image, 150, 450, 300, 300);
  }
  if (endItem == 63) {
    ctx.fillStyle = "white";
    ctx.font = "bold 60px monospace";
    ctx.fillText("  SNSで", 40, 100);
    ctx.fillText("　晒されたから", 40, 170);
    ctx.fillText("　家に籠るわ", 40, 240);
    ctx.fillText("　(´◉◞౪◟◉)」", 40, 310);

    var image = Asset.images["suma-tofonn"];
    ctx.drawImage(image, 150, 450, 300, 300);
  }

  ctx.restore();
  textAlpha += 0.01;
}

function onClickEnd(x, y) {
  Audio.playMusic("musics/Honky_Tonky.mp3", true);
  gameMode = "gamemain";
}
function endingItem() {
  var end = Object.keys(masterlitem)
  for (var i = 1; i < end.length; i++) {
    if (9 < masterlitem[i].rare) {
      endItemList.push(masterlitem[i].id);
    }
  }
}
