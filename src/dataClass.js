import { TYPE, POST_SIZE, INSTALLATION, AREA_PRICE,BRACKET_PRICE,POST_SIZE_LIMIT,TRACK_PRICE,SG_MOTOR_PRICE } from "./constants.js";
import { roundNumber } from "./utils.js";

class formData {
    constructor(type){
        this._type = type;
        this._width = 0;
        this._height = 0;
        this._GST = 0;
        this._total = 0;
        this._totalIncGST = 0;
        this._hasInstallation = true;
        this._installation = INSTALLATION[this._type];
        this._areaPrice = AREA_PRICE[this._type];
        this._allAreaPrice = 0;
        this._postSize =POST_SIZE.P4;
    }

    calculationDefence(){
        return this._width && this._height;
    }

    getPostPrice(){
        switch(this._postSize){
            case POST_SIZE.P1:
                return 65;
            case POST_SIZE.P2:
                return 60;
            case POST_SIZE.P3:
                return 55;
            case POST_SIZE.P4:
                return 50;
        }
    }

    getPostSize(){
        if(this.height <= POST_SIZE_LIMIT.P4){
            this._postSize = POST_SIZE.P4;
        }else if(this.height <= POST_SIZE_LIMIT.P3){
            this._postSize = POST_SIZE.P3;
        }else if(this.height <= POST_SIZE_LIMIT.P2){
            this._postSize = POST_SIZE.P2;
        }else{
            this._postSize = POST_SIZE.P1;
        }
    }

    get total(){
        return this._total;
    }

    get installation(){
        return this._hasInstallation ? this._installation : 0;
    }

    get totalIncGST(){
        return this._totalIncGST;
    }

    get GST(){
        return this._GST;
    }

    /**
     * @param {boolean} value
     */
    set width(value){
        this._width = value;
    }

    get width(){
        return this._width
    }

    /**
     * @param {boolean} value
     */
    set height(value){
        this._height = value;
    }

    get height(){
        return this._height
    }

    /**
     * @param {boolean} value
     */
    set hasInstallation(value){
        this._hasInstallation = value;
    }

    get allAreaPrice(){
        return this._allAreaPrice
    }

    get postSize(){
        return this._postSize
    }

    get total(){
        return this._total
    }

    get totalIncGST(){
        return this._totalIncGST
    }
}

class ASGData extends formData {
    constructor(){
        super(TYPE.ASG);
        this._trackRoadLength = 0;
        this._trackRoadPrice = 0;
        this._hasGK = true;
        this._GKPrice = 650;
        this._hasMotor = true;
        this._MotorPrice = 550;
        this._hasSS = false;
        this._SSPrice = 400;
        this._hasHDM = false;
        this._HDMPrice = 300;
    }

    calculation(){
        if(!super.calculationDefence()){
            return false;
        }
        let width = (Number(this._width) / 1000).toFixed(1);
        let height = (Number(this._height) / 1000).toFixed(1);
        this._allAreaPrice = Math.floor(roundNumber(width) * roundNumber(height) * this._areaPrice);
        this._trackRoadLength = Math.ceil(roundNumber(width)) * 2;
        this._trackRoadPrice = this._trackRoadLength * 10;
        // this._trackRoadPrice = Math.ceil(roundNumber(width)) * TRACK_PRICE
        this._total = this._allAreaPrice + this._trackRoadPrice + (this._hasGK ? this._GKPrice : 0) + (this._hasMotor ? this._MotorPrice : 0) +
        (this._hasSS ? this._SSPrice : 0) + (this._hasHDM ? this._HDMPrice : 0) +(this._hasInstallation ? this._installation : 0);
        this._GST = this._total * 0.1;
        this._totalIncGST = this._total + this._GST;
        return true;
    }   

    /**
     * @param {boolean} boolean
     */
    set hasGK(boolean){
        this._hasGK = boolean;
    }

    /**
     * @param {boolean} boolean
     */
    set hasMotor(boolean){
        this._hasMotor = boolean;
    }

    /**
     * @param {boolean} boolean
     */
    set hasSS(boolean){
        this._hasSS = boolean;
    }

    /**
     * @param {boolean} boolean
     */
    set hasHDM(boolean){
        this._hasHDM = boolean;
    }

    get trackRoadLength(){
        return this._trackRoadLength
    }

    get trackRoadPrice(){
        return this._trackRoadPrice;
    }

    get GKPrice(){
        return this._hasGK ? this._GKPrice : 0;
    }

    get MotorPrice(){
        return this._hasMotor ? this._MotorPrice : 0;
    }

    get SSPrice(){
        return this._hasSS ? this._SSPrice : 0;
    }

    get HDMPrice(){
        return this._hasHDM ? this._HDMPrice : 0;
    }
}

class PGData extends formData {
    constructor(){
        super(TYPE.PG);
        this._hasLockAndHinge = true;

        this._lockAndHinge = 120;
        this._postSize = POST_SIZE.P1;
        this._allPostPrice = 0;
    }

    calculation(){
        if(!super.calculationDefence()){
            return false;
        }
        let width = (Number(this._width) / 1000).toFixed(1);
        let height = (Number(this._height) / 1000).toFixed(1);
        this.getPostSize();
        const postPrice = this.getPostPrice();
        this._allAreaPrice = Math.floor(roundNumber(width) * roundNumber(height) * this._areaPrice);
        this._allPostPrice = postPrice * 2
        this._total = this._allAreaPrice + this._allPostPrice + (this._hasLockAndHinge ? this._lockAndHinge : 0) + (this._hasInstallation ? this._installation : 0);
        this._GST = this._total * 0.1;
        this._totalIncGST = this._total + this._GST;
        return true;
    }

    /**
     * @param {boolean} value
     */
    set hasLockAndHinge(value){
        this._hasLockAndHinge = value;
    }

    get postSize(){
        return this._postSize
    }

    get allPostPrice(){
        return this._allPostPrice
    }
}

class FenceData extends formData {
    constructor(){
        super(TYPE.PG);
        this._isInGround = true;
        this._postSize = POST_SIZE.P1;
        this._allPostPrice = 0;
        this._allBracketPrice = 0;
        this._bracketNumber = 0;
        this._areaPrice = AREA_PRICE.Fence;

    }

    calculationDefence(){
        return this._bracketNumber && super.calculationDefence();
    }

    calculation(){
        if(!this.calculationDefence()){
            return false;
        }
        
        let width = (Number(this._width) / 1000).toFixed(1);
        let height = (Number(this._height) / 1000).toFixed(1);
        this.getPostSize();
        const postPrice = this.getPostPrice();
        this._installation = (this._isInGround ? INSTALLATION.Fence :  INSTALLATION.FenceOnWall) *  this._bracketNumber
        this._allBracketPrice = this._bracketNumber * BRACKET_PRICE;
        this._allAreaPrice = Math.floor(roundNumber(width) * roundNumber(height) * this._areaPrice);
        this._allPostPrice = postPrice * (this._bracketNumber + 1);
        this._total = this._allAreaPrice + (this._isInGround ? this._allPostPrice : 0) + this._allBracketPrice + (this._hasInstallation ? this._installation : 0);
        this._GST = this._total * 0.1;
        this._totalIncGST = this._total + this._GST;
        return true;
    }


    /**
     * @param {Number} value
     */
    set postSize(value){
        this._postSize = value;
    }

    get allPostPrice(){
        return this._allPostPrice;
    }

    get allBracketPrice(){
        return this._allBracketPrice;
    }

    set isInGround(boolean){
        this._isInGround = boolean;
    }

    get isInGround(){
        return this._isInGround;
    }

    get postSize(){
        return this._postSize
    }

    set bracketNumber(value){
        this._bracketNumber = value
    }

    get bracketNumber(){
        return this._bracketNumber
    }
}

class SGData extends formData {
    constructor(){
        super(TYPE.PG);
        this._isMaunal = true;
        this._postSize = POST_SIZE.P1;
        this._allPostPrice = 0;
        // this._areaPrice = AREA_PRICE.SwingGate;
        this._hasHAL = true;
        this._HALPrice = 120;
        this._trackRoadPrice = 0;
        this._hasDoubleGate = false;
        this._hasHDH = true;
        this._HDHPrice = 200;
    }

    getPostPrice(){
        switch(this._postSize){
            case POST_SIZE.P1:
                return 80;
            case POST_SIZE.P2:
                return 75;
            case POST_SIZE.P3:
                return 70;
            case POST_SIZE.P4:
                return 65;
        }
    }


    calculation(){
        if(!super.calculationDefence()){
            return false;
        }
    
        this.getPostSize();
        const postPrice = this.getPostPrice();
        let width = (Number(this._width) / 1000).toFixed(1);
        let height = (Number(this._height) / 1000).toFixed(1);
        // this._areaPrice = (this._isMaunal ? AREA_PRICE.SwingGate : INSTALLATION.SwingGateAuto);
        this._installation = (this._isMaunal ? INSTALLATION.SwingGate : INSTALLATION.SwingGateAuto)

        this._allAreaPrice = Math.round(roundNumber(width) * roundNumber(height) * this._areaPrice * (this._hasDoubleGate ? 2 : 1)) ;
        this._allPostPrice = postPrice * 2;
        this._motorPrice = SG_MOTOR_PRICE

        this._trackRoadPrice = Math.ceil(roundNumber(width)) * TRACK_PRICE
        this._total = this._allAreaPrice + this._allPostPrice+ (this._hasHDH ? this._HDHPrice : 0)+(this._hasHAL ? this._HALPrice : 0) +(this._isMaunal ? 0 : this._trackRoadPrice) + (this._isMaunal ? 0 : this._motorPrice)+ (this._hasInstallation ? this._installation : 0);
        this._GST = this._total * 0.1;
        this._totalIncGST = this._total + this._GST;
        return true;
    }

    get allPostPrice(){
        return this._allPostPrice;
    }

    set isMaunal(boolean){
        this._isMaunal = boolean;
    }

    get isMaunal(){
        return this._isMaunal;
    }

    set hasHAL(boolean){
        this._hasHAL = boolean
    }

    set hasDoubleGate(boolean){
        this._hasDoubleGate = boolean
    }

    set hasHDH(boolean){
        this._hasHDH = boolean;
    }

    get trackRoadLength(){
        return  Math.ceil(roundNumber((Number(this._width) / 1000).toFixed(1)))
    }

    get trackRoadPrice(){
        return this._trackRoadPrice
    }

    get HALPrice(){
        return this._hasHAL ? this._HALPrice : 0
    }

    get HDHPrice(){
        return this._hasHDH ? this._HDHPrice : 0
    }
}

export default{
    PGData:PGData,
    ASGData:ASGData,
    FenceData:FenceData,
    SGData:SGData
}
