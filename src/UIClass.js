import { POST_SIZE_HEIGHT,AREA_PRICE } from "./constants.js";

class cardUI {
    constructor(ui){
        this._ui = ui;
        this._container = null;
    }

    get ui(){
        return this._ui;
    }

    /**
     * @param {any} object
     */
    set container(object){
        this._container = object;
    }

    get container(){
        return this._container;
    }

}

class cardManager {
    constructor(){
        this._currentForm = null;
        this._currentSelectedCard = null;
        this.PGCard = new cardUI(document.getElementById("PGCard"));
        this.PGCard.container = document.getElementById("PedestrianGateContainer");
        this.ASGCard = new cardUI(document.getElementById("ASGCard"));
        this.ASGCard.container = document.getElementById("ASGContainer");
        this.FenceCard = new cardUI(document.getElementById("FenceCard"));
        this.FenceCard.container = document.getElementById("FenceContainer");
        this.SGCard = new cardUI(document.getElementById("SGCard"));
        this.SGCard.container = document.getElementById("SGContainer");
        this.allCards = [this.PGCard, this.ASGCard, this.FenceCard, this.SGCard];
        this.blocker = false;
    }

    addListener(){
        const self = this;
        this.allCards.forEach(card =>{
            card.ui.addEventListener('click', ()=>{
                if(this.blocker)return;
                if(this._currentSelectedCard){
                    this._currentSelectedCard.ui.classList.remove('border-primary', 'shadow', 'selected')
                }
                this._currentSelectedCard = card;
                this._currentSelectedCard.ui.classList.add('border-primary', 'shadow', 'selected')
                this.blocker = true;
                self.handleClick(card);
                setTimeout(()=>{
                    document.getElementById("main-form").scrollIntoView({ behavior: "smooth" });
                },30)
                
            })
        })
    }

    addFadeIn(container){
        container.classList.remove('custom-fade-out');
        container.classList.remove('d-none');
        setTimeout(() => {
            container.classList.add('custom-fade-in');
            this.blocker = false;
        }, 10);
    }

    addFadeOut(container){
        container.classList.remove('custom-fade-in');
        container.classList.add('custom-fade-out');
        setTimeout(() => {
            container.classList.add('d-none');
        }, 10);
    }

    handleClick(card){
        if(this._currentForm){
            this.addFadeOut(this._currentForm);
            setTimeout(()=>{
                this.addFadeIn(card.container)
            }, 20);
        }else{
            setTimeout(()=>{
                this.addFadeIn(card.container)
            }, 20);
        }
        this._currentForm = card.container;
    }
}

class formUI {
    constructor(container){
        this._container = container;
        this._dataObject = null;
        this._totalUI = null;
        this._GSTUI = null;
        this._totalIncGSTUI = null;
        this._widthUI = null;
        this._heightUI = null;
        this._installationUI = null;
    }

    addListener(){
        const inputs = this._container.querySelectorAll('input, select');
        inputs.forEach(input =>{
            if(input.tagName === 'SELECT'){
                input.addEventListener("input", this.handleSelectChange.bind(this));
            }else if(input.type === 'checkbox'){
                input.addEventListener("input", this.handleCheckChange.bind(this));
            }else{
                input.addEventListener("input", this.handleInputChange.bind(this));
            }
        })
    }

    setValueLimit(element){
        const inputValue = Number(element.value);
        const maxValue = Number(element.max);
        const minValue = Number(element.min);
        if(inputValue > maxValue){
            element.value = maxValue;
        }else if(inputValue < minValue){
            element.value = minValue;
        }
        return Number(element.value);
    }


    showAndHideElement(element, isShow){
        if(isShow){
            element.classList.remove('d-none');
        }else{
            element.classList.add('d-none');
        }
    }


    /**
     * @param {any} ui
     */
    set totalUI(ui){
        this._totalUI = ui;
    }

    /**
     * @param {any} ui
     */
    set GSTUI(ui){
        this._GSTUI = ui;
    }

    /**
     * @param {any} ui
     */
    set totalIncGSTUI(ui){
        this._totalIncGSTUI = ui;
    }

    /**
     * @param {any} ui
     */
    set widthUI(ui){
        this._widthUI = ui;
    }

    /**
     * @param {any} ui
     */
    set heightUI(ui){
        this._heightUI = ui;
    }

    /**
     * @param {any} ui
     */
    set installationUI(ui){
        this._installationUI = ui;
    }

    /**
     * @param {any} object
     */
    set dataObject(object){
        this._dataObject = object
    }

    get container(){
        return this._container;
    }
}

class ASGformUI extends formUI{
    constructor(container){
        super(container);
        this._hasGK = true;
        this._hasMotor = true;
        this._hasSS = false;
        this._hasHDM = false;
        this.initCartForm();
    }

    initCartForm(){
        this._ASGAreaPriceUI = document.getElementById("ASGAreaPrice");
        this._ASGGKPriceUI = document.getElementById("ASGGKPrice");
        this._ASGTrackPriceUI = document.getElementById("ASGTrackPrice");
        this._ASGMotorPriceUI = document.getElementById("ASGMotorPrice");
        this._ASGSSPriceUI = document.getElementById("ASGSolarPrice");
        this._ASGHDMPriceUI = document.getElementById("ASGHDMPrice");
        this._ASGINSTPriceUI = document.getElementById("ASGINSTPrice");
        this._ASGTOTALUI = document.getElementById("ASGTOTAL");
        this._ASGSSItemUI = document.getElementById("ASGSSItem");
        this._ASGHDMItemUI = document.getElementById("ASGHDMItem");
        this._ASGGKItemUI = document.getElementById("ASGGKItem");
        this._ASGMotorItemUI = document.getElementById("ASGMotorItem");
        this._ASGTOTALGSTUI = document.getElementById("ASGTOTALGST");
        this._ASGTrackSecondText = document.getElementById("ASGTrackSecondText");
    }

    handleChange(){
        const needsRefreshCart = this._dataObject.calculation();
        if(needsRefreshCart){
            this._ASGAreaPriceUI.textContent = '$'+this._dataObject.allAreaPrice;
            this._ASGGKPriceUI.textContent = '$'+this._dataObject.GKPrice;
            this._ASGTrackPriceUI.textContent = '$'+ this._dataObject.trackRoadPrice;
            this._ASGMotorPriceUI.textContent = '$'+this._dataObject.MotorPrice;
            this._ASGSSPriceUI.textContent = '$'+this._dataObject.SSPrice;
            this._ASGHDMPriceUI.textContent = '$'+this._dataObject.HDMPrice;
            this._ASGINSTPriceUI.textContent = '$'+this._dataObject.installation;

            this._ASGTrackSecondText.textContent = "Length: " + (this._dataObject.trackRoadLength * 1000) + " mm"

            this._ASGTOTALUI.textContent = '$'+this._dataObject.total;
            this._ASGTOTALGSTUI.textContent = '$'+this._dataObject.totalIncGST;
        }
    }

    handleInputChange(event){
        
        const domID = event.target.id;
        let value = event.target.value;
        switch(domID){
            case "ASGWidth":
                value = super.setValueLimit(event.target)
                this._dataObject.width = value;
                break;
            case "ASGHeight":
                value = super.setValueLimit(event.target)
                this._dataObject.height = value;
                break;
        }
        this.handleChange();
    }

    handleCheckChange(event){
        const domID = event.target.id;
        const value = event.target.checked;
        switch(domID){
            case "ASGGK":
                this._dataObject.hasGK = value;
                this.showAndHideElement(this._ASGGKItemUI, value);
                break;
            case "ASGMotor":
                this._dataObject.hasMotor = value;
                this.showAndHideElement(this._ASGMotorItemUI, value);
                break;
            case "ASGSS":
                this._dataObject.hasSS = value;
                this.showAndHideElement(this._ASGSSItemUI, value);
                break;
            case "ASGHDM":
                this._dataObject.hasHDM = value;
                this.showAndHideElement(this._ASGHDMItemUI, value)
                break;
            case "ASGInstallaionFee":
                this._dataObject.hasDoubleGate = value;
                break;
            case "ASGDoulbe":
                this._dataObject.hasInstallation = value;
                break;
        }
        this.handleChange();
    }

    /**
     * @param {boolean} boolean
     */
    set hasGK(boolean){
        this._hasGK = boolean
    }

    /**
     * @param {boolean} boolean
     */
    set hasMotor(boolean){
        this._hasMotor = boolean
    }

    /**
     * @param {boolean} boolean
     */
    set hasSS(boolean){
        this._hasSS = boolean
    }

    /**
     * @param {boolean} boolean
     */
    set hasHDM(boolean){
        this._hasHDM = boolean
    }
}

class PGformUI extends formUI{
    constructor(container){
        super(container);
        this._postSizeUI = null;
        this._lockAndHingesUI = null;
        this.initCartForm();
    }

    /**
     * @param {any} ui
     */
    set postSizeUI(ui){
        this._postSizeUI = ui;
    }

    /**
     * @param {any} ui
     */
    set lockAndHingesUI(ui){
        this._lockAndHingesUI = ui;
    }

    handleChange(){
        const needsRefreshCart = this._dataObject.calculation();
        if(needsRefreshCart){
            this._PGAreaPriceUI.textContent = '$'+this._dataObject.allAreaPrice;
            this._PGPOSTPriceUI.textContent = '$'+this._dataObject.allPostPrice;
            this._PGLAHPriceUI.textContent = '$'+(this._dataObject._hasLockAndHinge ? this._dataObject._lockAndHinge : 0);
            this._PGINSTPriceUI.textContent = '$'+(this._dataObject._hasInstallation ? this._dataObject._installation : 0);
            this._PGTOTALUI.textContent = '$'+this._dataObject.total;
            this._PGTOTALGSTUI.textContent = '$'+this._dataObject.totalIncGST;

            this._PGPostSecondText.textContent = "65 x 65 Post " + POST_SIZE_HEIGHT[this._dataObject.postSize] + " mm"
        }
    }


    handleInputChange(event){
        
        const domID = event.target.id;
        let value = event.target.value;
        switch(domID){
            case "PGWidth":
                value = super.setValueLimit(event.target)
                this._dataObject.width = value;
                break;
            case "PGHeight":
                value = super.setValueLimit(event.target)
                this._dataObject.height = value;
                break;
        }
        this.handleChange();
    }

    handleSelectChange(event){
        const value = event.target.value;
        this._dataObject.postSize = value;
        this.handleChange();
    }

    handleCheckChange(event){
        const domID = event.target.id;
        const value = event.target.checked;
        switch(domID){
            case "PGLockAndHinges":
                this._dataObject.hasLockAndHinge = value;
                break;
            case "PGInstallaionFee":
                this._dataObject.hasInstallation = value;
                break;
        }
        this.handleChange();
    }

    initCartForm(){
        this._PGAreaPriceUI = document.getElementById("PGAreaPrice");
        this._PGPOSTPriceUI = document.getElementById("PGPOSTPrice");
        this._PGLAHPriceUI = document.getElementById("PGLAHPrice");
        this._PGINSTPriceUI = document.getElementById("PGINSTPrice");
        this._PGTOTALUI = document.getElementById("PGTOTAL");
        this._PGTOTALGSTUI = document.getElementById("PGTOTALGST");
        this._PGPostSecondText = document.getElementById("PGPOSTSecondText");
    }
}

class FenceformUI extends formUI{
    constructor(container){
        super(container);
        this._postSizeUI = null;
        this.initCartForm();
    }

    /**
     * @param {any} ui
     */
    set postSizeUI(ui){
        this._postSizeUI = ui;
    }

    /**
     * @param {any} ui
     */
    set lockAndHingesUI(ui){
        this._lockAndHingesUI = ui;
    }

    initCartForm(){
        this._FAreaPriceUI = document.getElementById("FAreaPrice");
        this._FBracketPriceUI = document.getElementById("FBracketPrice");
        this._FPOSTPriceUI = document.getElementById("FPostPrice");
        this._FINSTPriceUI = document.getElementById("FINSTPrice");
        this._FTOTALUI = document.getElementById("FTOTAL");
        this._FTOTALGSTUI = document.getElementById("FTOTALGST");
        this._FPOSTITEMUI = document.getElementById("FPOSTITEM");
        this._FAreaSecondText = document.getElementById("FAreaSecondText");
        this._FPostSecondText = document.getElementById("FPOSTSecondText");
        this._FBracketSecondText = document.getElementById("FBracketSecondText");
    }

    handleChange(){
        const needsRefreshCart = this._dataObject.calculation();
        if(needsRefreshCart){
            this._FAreaPriceUI.textContent = '$'+this._dataObject.allAreaPrice;
            this._FBracketPriceUI.textContent = '$'+this._dataObject.allBracketPrice;
            this._FPOSTPriceUI.textContent = '$'+this._dataObject.allPostPrice;
            this._FINSTPriceUI.textContent = '$'+this._dataObject.installation;
            this._FTOTALUI.textContent = '$'+this._dataObject.total;
            this._FTOTALGSTUI.textContent = '$'+this._dataObject.totalIncGST;
            this._FBracketSecondText.textContent = "$15 x " + this._dataObject.bracketNumber;
            this._FAreaSecondText.textContent = "$" + (this._dataObject.isInGround ? AREA_PRICE.Fence : AREA_PRICE.FenceOnWall) +"/m²"
            this._FPostSecondText.textContent = "65 x 65 Post " + POST_SIZE_HEIGHT[this._dataObject.postSize] + " mm"
        }
    }


    handleInputChange(event){
        
        const domID = event.target.id;
        let value = event.target.value;
        switch(domID){
            case "FWidth":
                value = super.setValueLimit(event.target)
                this._dataObject.width = value;
                break;
            case "FHeight":
                value = super.setValueLimit(event.target)
                this._dataObject.height = value;
                break;
            case "FNumber":
                value = super.setValueLimit(event.target)
                this._dataObject.bracketNumber = value;
                break;
            case "IGP":
                this._dataObject.isInGround = true;
                this.showAndHideElement(this._FPOSTITEMUI, true);
                this._FAreaSecondText.textContent = "$" + (this._dataObject.isInGround ? AREA_PRICE.Fence : AREA_PRICE.FenceOnWall) +"/m²"
                break;
            case "OBW":
                this._dataObject.isInGround = false;
                this.showAndHideElement(this._FPOSTITEMUI, false);
                this._FAreaSecondText.textContent = "$" + (this._dataObject.isInGround ? AREA_PRICE.Fence : AREA_PRICE.FenceOnWall) +"/m²"
                break;
        }
        this.handleChange();
    }

    handleCheckChange(event){
        const domID = event.target.id;
        const value = event.target.checked;
        this._dataObject.hasInstallation = value;
        this.handleChange();
    }

    
}

class SGformUI extends formUI{
    constructor(container){
        super(container);
        this._postSizeUI = null;
        this.initCartForm();
    }

    /**
     * @param {any} ui
     */
    set postSizeUI(ui){
        this._postSizeUI = ui;
    }

    /**
     * @param {any} ui
     */
    set lockAndHingesUI(ui){
        this._lockAndHingesUI = ui;
    }

    initCartForm(){
        this._SGAreaPriceUI = document.getElementById("SGAreaPrice");
        this._SGPOSTPriceUI = document.getElementById("SGPOSTPrice");
        this._SGINSTPriceUI = document.getElementById("SGINSTPrice");
        this._SGTrackPrice = document.getElementById("SGTrackPrice");
        this._SGHALPrice = document.getElementById("SGHALPrice");
        this._SGHDHPrice = document.getElementById("SGHDHPrice");
        this._SGTrackItem = document.getElementById("SGTrackItem");
        this._SGTOTALUI = document.getElementById("SGTOTAL");
        this._SGTOTALGSTUI = document.getElementById("SGTOTALGST");
        this._SGMotorItem = document.getElementById("SGMotorItem");
        this._SGPostSecondText = document.getElementById("SGPOSTSecondText");
        this._SGTrackSecondText = document.getElementById("SGTrackSecondText");
    }

    handleChange(){
        const needsRefreshCart = this._dataObject.calculation();
        if(needsRefreshCart){
            this._SGAreaPriceUI.textContent = '$'+this._dataObject.allAreaPrice;
            this._SGPOSTPriceUI.textContent = '$'+this._dataObject.allPostPrice;
            this._SGTrackPrice.textContent = '$'+this._dataObject.trackRoadPrice;

            this._SGHDHPrice.textContent = '$'+this._dataObject.HDHPrice;
            this._SGHALPrice.textContent = '$'+this._dataObject.HALPrice;
            this._SGINSTPriceUI.textContent = '$'+this._dataObject.installation;
            this._SGTOTALUI.textContent = '$'+this._dataObject.total;
            this._SGTOTALGSTUI.textContent = '$'+this._dataObject.totalIncGST;
            this._SGTrackSecondText.textContent = "Length: " + (this._dataObject.trackRoadLength * 1000) + " mm"
            this._SGPostSecondText.textContent = "76 x 76 Post " + POST_SIZE_HEIGHT[this._dataObject.postSize] + " mm"
        }
    }


    handleInputChange(event){
        
        const domID = event.target.id;
        let value = event.target.value;
        switch(domID){
            case "SGWidth":
                value = super.setValueLimit(event.target)
                this._dataObject.width = value;
                break;
            case "SGHeight":
                value = super.setValueLimit(event.target)
                this._dataObject.height = value;
                break;
            case "Maunal":
                this._dataObject.isMaunal = true;
                this.showAndHideElement(this._SGMotorItem, false);
                this.showAndHideElement(this._SGTrackItem, false);
                break;
            case "Auto":
                this._dataObject.isMaunal = false;
                this.showAndHideElement(this._SGMotorItem, true);
                this.showAndHideElement(this._SGTrackItem, true);
                break;
        }
        this.handleChange();
    }

    handleCheckChange(event){
        const domID = event.target.id;
        const value = event.target.checked;
        switch(domID){
            case "SGLockAndHinges":
                this._dataObject.hasHAL = value;
                break;
            case "SGHDM":
                this._dataObject.hasHDH = value;
                break;
            case "SGDoulbe":
                this._dataObject.hasDoubleGate = value;
                break;
            case "SGInstallaionFee":
                this._dataObject.hasInstallation = value;
                break;
        }
        this.handleChange();
    }

    
}

export default{
    ASGformUI:ASGformUI,
    PGformUI:PGformUI,
    FenceformUI:FenceformUI,
    SGformUI:SGformUI,
    cardUI:cardUI,
    cardManager:cardManager,

}
