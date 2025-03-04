export const TYPE = {
    PG:"PedestrianGate",
    ASG:"AutoslidingGate",
    FENCE: "Fence",
    SG:"SwingGate"
}

export const BRACKET_PRICE = 15;
export const TRACK_PRICE = 10;
export const SG_MOTOR_PRICE = 850;

export const POST_SIZE = {
    P1:"P1",
    P2:"P2",
    P3:"P3",
    P4:"P4",
}

export const POST_SIZE_LIMIT = {
    P1:2100,
    P2:1800,
    P3:1500,
    P4:1200,
}

export const POST_SIZE_HEIGHT = {
    P1:2700,
    P2:2400,
    P3:2100,
    P4:1800,
}

export const INSTALLATION = {
    PedestrianGate:300,
    AutoslidingGate:1200,
    Fence:120,
    FenceOnWall:60,
    SwingGate:800,
    SwingGateAuto:1200
};

export const AREA_PRICE = {
    PedestrianGate:300,
    AutoslidingGate:300,
    Fence:130,
    FenceOnWall:60,
    SwingGate:300,
}

export const FORM_UI_ID = {
    PedestrianGate: "PedestrianGateForm"
}

export default{
    TYPE:TYPE,
    POST_SIZE:POST_SIZE,
    INSTALLATION:INSTALLATION,
    AREA_PRICE:AREA_PRICE,
    FORM_UI_ID:FORM_UI_ID,
    BRACKET_PRICE:BRACKET_PRICE,
    TRACK_PRICE:TRACK_PRICE,
    SG_MOTOR_PRICE:SG_MOTOR_PRICE,
    POST_SIZE_HEIGHT:POST_SIZE_HEIGHT
}