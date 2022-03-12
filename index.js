const $ = document;
const target = $.getElementById("target");

// 初期化処理
(function (target) {
    let html = "";

    html += `
    <div class="vh-100 d-flex justify-content-center align-items-center col-md-11 col-12" >
        <div class="col-md-8 bg-light py-5">
            <div class="row justify-content-center">
                <div id="sliderData" class="slider-data d-none col-12">
                </div>
                <div id="sliderArea" class="d-flex justify-content-center align-items-center col-md-6 col-12">
                </div>
                <div id="buttonArea" class="col-xl-5 col-lg-7 col-md-8 col-12">
                </div>
            </div>
            <div id="pushButtonArea" class="d-flex justify-content-center align-items-center col-12 text-center py-4">
            </div>
        </div>
    </div>
    `
    target.innerHTML += html;

}(target)); // 実行時に渡したい引数はこっちに記述

// 飲み物の情報を持たせるクラス
class Drink {
    constructor(name, price, imgUrl) {
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}

// インスタンス化した飲み物
const drink = [
    new Drink("コーラ", "100", "https://1.bp.blogspot.com/-4wZVSlL6iwU/X9Gh2gfkGPI/AAAAAAABcxo/5k6If1oQbKMJR6JiZGHQQ5spYWmVbgSOwCNcBGAsYHQ/s647/drink_cola_zero_petbottle.png"),
    new Drink("ミルクティー", "150", "https://1.bp.blogspot.com/-8Sg7f-1S4mQ/X5OcRnFR2hI/AAAAAAABb7o/eZCm6DJdWrQ3htv6n-4dki43Td5UuGRnQCNcBGAsYHQ/s537/drink_tea_chai.png"),
    new Drink("ピンクミルク", "80", "https://1.bp.blogspot.com/-LnNm3StOzM0/X9GYBpPkMdI/AAAAAAABcsM/AKIfE3Y0hicvt_sbFu5o1XqL1LnmK3f7ACNcBGAsYHQ/s664/drink_pink_milk.png"),
    new Drink("さくらんぼ", "200", "https://food-foto.jp/free/img/images_big/dri0017-054.jpg"),
    new Drink("ウーロン茶", "100", "https://food-foto.jp/free/img/images_big/fd401351.jpg"),
    new Drink("ビール", "250", "https://food-foto.jp/free/img/images_big/fd401366.jpg"),
    new Drink("ホットコーヒー", "150", "https://food-foto.jp/free/img/images_big/dri0005-001.jpg"),
    new Drink("焼酎（ロック）", "200", "https://food-foto.jp/free/img/images_big/fd401478.jpg"),
    new Drink("ワイン", "300", "https://food-foto.jp/free/img/images_big/fd401455.jpg"),
];

// アクセスしたいDOMをまとめたオブジェクト
const targetDomLists = {
    sliderData: $.getElementById("sliderData"),
    sliderArea: $.getElementById("sliderArea"),
    buttonArea: $.getElementById("buttonArea"),
    pushButtonArea: $.getElementById("pushButtonArea"),
}

class SliderArea {

    // スライドさせる画像要素を格納する配列
    static sliderDomLists = [];

    static initSliderArea(drink) {
        this.creataSliderDasta(drink);
        this.createSliderArea();
        this.createBushButtonArea();
    }

    static creataSliderDasta(drink) {

        for (let i = 0; i < drink.length; i++) {
            const sliderImg = $.createElement("img");
            sliderImg.setAttribute("src", drink[i].imgUrl);
            sliderImg.classList.add("slider-item", "slider-img");
            targetDomLists.sliderData.append(sliderImg);
        }

    }

    static createSliderArea() {

        const mainDiv = $.createElement("div");
        const extraDiv = mainDiv.cloneNode(true);
        mainDiv.classList.add("main", "full-width");
        extraDiv.classList.add("extra", "full-width");

        const sliderData = $.querySelectorAll(".slider-item");
        sliderData.forEach((elm) => {
            this.sliderDomLists.push(elm);
        });

        mainDiv.setAttribute("data-index", "0");

        mainDiv.append(this.sliderDomLists[0]);

        targetDomLists.sliderArea.append(mainDiv);
        targetDomLists.sliderArea.append(extraDiv);
    }

    static createBushButtonArea() {

        const pushButton = $.createElement("button");
        pushButton.innerHTML = "PUSH";
        pushButton.classList.add("btn", "btn-push");
        // Drinkの情報を出力するイベントを追加
        pushButton.addEventListener("click", function () {
            Action.viewCurrentDrinkInfo();
            Action.sliderJump(1);
            Action.sliderJump(-1);
        });

        targetDomLists.pushButtonArea.append(pushButton);
    }
}

class Action {
    static viewCurrentDrinkInfo(index) {
        alert("click!");
    }

    static sliderJump(steps) {

        let animationType = "";
        let index = parseInt($.querySelector(".main").getAttribute("data-index"));

        if(steps > index) animationType = "left";
        else animationType = "right";

        let currentElement = SliderArea.sliderDomLists[index];

        index += steps;

        console.log(`index += steps: ${index}`);

        if (index < 0) index = SliderArea.sliderDomLists.length - 1;
        else if (index >= SliderArea.sliderDomLists.length) index = 0;

        console.log(index)

        let nextElement = SliderArea.sliderDomLists[index];

        const mainDiv = $.querySelector(".main");
        mainDiv.setAttribute("data-index", steps.toString());

        this.animateMain(currentElement, nextElement, animationType)
    }

    static animateMain(currentElement, nextElement, animationType) {
        const mainDiv = $.querySelector(".main");
        const extraDiv = $.querySelector(".extra");

        // extraに今の要素を入れる
        // extraはスライドのエフェクトなので消滅する今の要素を入れる
        extraDiv.innerHTML = "";
        extraDiv.append(currentElement);
        console.log(currentElement)

        // mainDivに次の要素を入れる
        mainDiv.innerHTML = "";
        mainDiv.append(nextElement);
        console.log(nextElement)

        // mainDivが出てくるようにexpendのアニメーションをつける
        // もう一度、上のCSSのアニメーションを確認してみよう
        mainDiv.classList.add("expand-animation");
        extraDiv.classList.add("deplete-animation");

        if (animationType === "right") {
            targetDomLists.sliderArea.innerHTML = "";
            // 次のmainを後に入れる
            // extraDivが消えてmainDivが出現するアニメーション
            targetDomLists.sliderArea.append(extraDiv);
            targetDomLists.sliderArea.append(mainDiv);
        } else if (animationType === "left") {
            // extraと反対側にアニメーションするmainを先に持っていく
            targetDomLists.sliderArea.append(mainDiv);
            targetDomLists.sliderArea.append(extraDiv);
        }
    }
}

class ButtonArea {
    static initButtonArea(drink) {
        this.createDrinkInfo(drink);
        this.createButtonArea(drink);
    }
    static createDrinkInfo(drink) {

        const drinkInfoHtml = `
            <div class="row justify-content-center">
                <h3 class="col-md-2 text-center">1</h3>
                <div class="col-md-8">
                    <p>Drink Name: ${drink[0].name}</p>
                    <p>Drink Price ${drink[0].price}</p>
                </div>
            </div>
        `
        targetDomLists.buttonArea.innerHTML += drinkInfoHtml;
    }

    static createButtonArea(drink) {
        const parentDom = $.createElement("div");
        parentDom.classList.add("row", "justify-content-center", "py-3");

        const childDom = $.createElement("div");
        childDom.classList.add("col-lg-7", "col-md-9");

        for (let i = 1; i <= drink.length; i++) {
            childDom.innerHTML += `
            <button class="btn btn-custom mr-2 mb-2">
            ${i}
            </button>`
        }

        parentDom.append(childDom);
        targetDomLists.buttonArea.append(parentDom);

        targetDomLists.buttonArea.querySelectorAll(".btn").forEach((item, index) => {
            item.addEventListener("click", function () {
                Action.sliderJump(index);
            })
        })
    }

}


SliderArea.initSliderArea(drink);
ButtonArea.initButtonArea(drink);