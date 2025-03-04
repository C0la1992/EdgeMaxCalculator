import UIClass from "./UIClass.js"; 
import dataClass from "./dataClass.js"; 

function init(){
    const cardManager = new UIClass.cardManager();
    cardManager.addListener();
    const PGformUIDOM = document.getElementById("PedestrianGateContainer");
    const PGformUIObject = new UIClass.PGformUI(PGformUIDOM);
    const PGData = new dataClass.PGData();
    PGformUIObject.dataObject = PGData;
    PGformUIObject.addListener();

    const ASGformUIDOM = document.getElementById("ASGContainer");
    const ASGformUIObject = new UIClass.ASGformUI(ASGformUIDOM);
    const ASGData = new dataClass.ASGData();
    ASGformUIObject.dataObject = ASGData;
    ASGformUIObject.addListener();

    const FFormUIDOM = document.getElementById("FenceContainer");
    const FFormUIObject = new UIClass.FenceformUI(FFormUIDOM);
    const FData = new dataClass.FenceData();
    FFormUIObject.dataObject = FData;
    FFormUIObject.addListener();

    const SGFormUIDOM = document.getElementById("SGContainer");
    const SGFormUIObject = new UIClass.SGformUI(SGFormUIDOM);
    const SGData = new dataClass.SGData();
    SGFormUIObject.dataObject = SGData;
    SGFormUIObject.addListener();

}

init();