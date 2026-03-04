import type { Activity } from "../types";

export type ActivityActions = {
    type: "save-activity";
    payLoad: { newActivity: Activity };
};

type activityState = {
    activities: Activity[];
};

export const initialState: activityState = {
    activities: [],
};

export const activityReducer = (
    state: activityState = initialState,
    action: ActivityActions,
) => {
    if (action.type === "save-activity") {
        //este cdigo maneja la logica para actualizar el state
        console.log("desde el type de save-activity");
    }
    return state
};
