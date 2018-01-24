var textAlpha = 0;
var storyText = [
  "はるか未来、世界は",
  "今と比べ物にならないほど発展した",
  "しかし、その栄華は長く続かなかった",
  "様々な自然災害により文明は崩壊",
  "人々は分断された",
  "人々を探しに行くため文明を復旧し",
  "移動手段を作らなければ"
]
function renderStory() {
  ctx.save();
  ctx.globalAlpha = textAlpha + 0.01;
  ctx.fillStyle = "white"
  ctx.font = "30px monospace";
  storyText.forEach(function(text, i) {
    ctx.fillText(text, 30, 100 + 45 * i)
    var shobabaiku = Asset.images["shobabaiku"];
    ctx.drawImage(shobabaiku, 170, 450, 300, 300);
  })
  ctx.restore();
  textAlpha += 0.01;
}

function onClickStory(x, y) {
  gameMode = "gamemain"
  textAlpha = 0;
};
