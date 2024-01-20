// キャラクターリスト（書き換えてください）
const characters = [
    // R
     { name: "R: R画像", image: "characters/SR/R (1).png" , rarity: "R", url:"characters/SR/R (1).png"}, 
    // SR
    { name: "SR: SR画像", image: "characters/SR/SR (1).png" , rarity: "SR", url: "characters/SR/SR (1).png"},
     // SSR
    { name: "SSR: SSR画像", image: "characters/SSR/SSR (1).jpg" , rarity: "SSR", url: "characters/SSR/SSR (1).jpg"},
    // 他のキャラクターのデータを追加
];

const collectedCharacters = [];

  // ガチャを回す処理
function startSpin() {
    const spinButton = document.getElementById("spin-button");
    spinButton.disabled = true; // ガチャボタンを無効化
    
    const iconContainer = document.querySelector(".icon-container");
    iconContainer.classList.add("spin-animation"); // 回転アニメーションのクラスを追加
    // 回転アニメーションの開始（適切な実装が必要）
    
    spinButton.classList.add("button-click-animation"); // クリックアニメーションのクラスを追加
  
    setTimeout(() => {
        // 結果の抽選処理
        const randomValue = Math.random() * 100; // 0から100までのランダムな数値を生成
        let selectedCharacter;
    

        // 確率（書き換えてください）
        if (randomValue <= 80) {
          // 80%の確率でレア度1 (R)
          selectedCharacter = getRandomCharacterByRarity("R");
        } else if (randomValue <= 99) {
          // 19%の確率でレア度2 (SR)
          selectedCharacter = getRandomCharacterByRarity("SR");
        } else {
          // 1%の確率でレア度3 (SSR)
          selectedCharacter = getRandomCharacterByRarity("SSR");
        }

        // コレクションに追加
        collectCharacter(selectedCharacter);

        setTimeout(() => {
          spinButton.classList.remove("button-click-animation"); // クリックアニメーションのクラスを削除
          spinButton.disabled = false; // ガチャボタンを再度有効化
        }, 300); // アニメーションが完了するまでの時間
        
        // 結果の表示
        showResult(selectedCharacter);
      
        setTimeout(() => {
            iconContainer.classList.remove("spin-animation"); // 回転アニメーションのクラスを削除
            spinButton.disabled = false; // ガチャボタンを再度有効化
      }, 1000); // アイコンを最初の位置に戻すまでの時間
    }, 1000); // 2秒後に結果を表示
}

// レア度に基づいてランダムなキャラクターを選択する関数
function getRandomCharacterByRarity(rarity) {
  const filteredCharacters = characters.filter(
    (character) => character.rarity === rarity
  );
  const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
  return filteredCharacters[randomIndex];
}

  // 結果の表示処理
function showResult(character) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
    <h3>${character.name}</h3>
    <img src="${character.image}" alt="${character.name}" data-url="${character.url}">
  `;
  
  // クラスリストをリセット
  resultContainer.className = "result-container";

  // SRとSSRの場合に特別なスタイルを適用
  if (character.rarity === "SR") {
    resultContainer.classList.add("sr-result");
  } else if (character.rarity === "SSR") {
    resultContainer.classList.add("ssr-result");
  }

  const resultImage = document.querySelector("#result-container img");
  resultImage.addEventListener("click", () => {
    const url = resultImage.getAttribute("data-url");
    if (url) {
      window.open(url, "_blank");
    }
  });
}

function collectCharacter(character) {
  collectedCharacters.push(character);
}

function showCollection() {
  const collectionContainer = document.getElementById("collection-container");
  collectionContainer.innerHTML = "";

  collectedCharacters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.classList.add("character-item");
    characterElement.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p>${character.name}</p>
    `;

    collectionContainer.appendChild(characterElement);
  });
}
