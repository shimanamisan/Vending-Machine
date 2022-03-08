const $ = document
const target = $.getElementById("target")

class Drink {
    constructor(name, price, image) {
        this.name = name
        this.price = price
        this.image = image
    }
}

const drink = [
    new Drink("コーラ"),
    new Drink("カルピス"),
    new Drink("ファンタオレンジ"),
    new Drink("ファンタグレープ"),
    new Drink("水"),
    new Drink("デカビタC"),
    new Drink("ペプシコーラ"),
    new Drink("ミックスジュース"),
    new Drink("コーラ"),
]

class SliderApplication {
    constructor() {

    }

    static createContainer() {
        let container = `<div class="vh-100 d-flex justify-content-center align-items-center col-md-11 col-12" >
                            <div class="col-md-8 bg-light py-5">
                                <div class="row justify-content-center">`

        container += this.createSubElement()

        container += `          </div>
                                <div class="col-md-8 col-12 text-center py-4">
                                    <button class="btn btn-push">PUSH</button>
                                </div>
                            </div>
                        </div>`
        return container
    }

    static createSubElement() {
        let subContainer = `
            <div class="col-md-6 col-12">
            <div class="slider-container">
                <img
                    class="align-middle"
                    src="https://placehold.jp/3d4070/ffffff/300x200.png"
                    alt=""
                    srcset=""
                />
            </div>
            </div>
            <div class="col-xl-5 col-lg-7 col-md-8 col-12">
                <div class="row justify-content-center">
                    <h3 class="col-md-2 text-center">1</h3>
                    <div class="col-md-8">
                        <p>Drink Name</p>
                        <p>Drink Price</p>
                    </div>
                </div>
                <div class="row justify-content-center py-3">
                    <div id="btnArea" class="row justify-content-center col-lg-6 col-md-9">
                    </div>
                </div>
            </div>`

        return subContainer
    }
}

class Button {
    static createButton() {
        const $ = document
        const buttonContainer = $.createElement("div")
        buttonContainer.classList.add("row", "justify-content-center", "py-3")

        let buttonHtmlStr = ""

        for (let i = 1; i <= drink.length; i++) {
            buttonHtmlStr += `<button class="btn btn-custom mr-2 mb-2">${i}</button>`
        }

        return buttonHtmlStr;
    }
}



target.innerHTML += SliderApplication.createContainer();

$.getElementById("btnArea").innerHTML += Button.createButton()