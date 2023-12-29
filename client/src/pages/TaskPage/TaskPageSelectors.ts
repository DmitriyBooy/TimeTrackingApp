import {RootState} from "store";

export const selectTaskData = (state: RootState) => state.task.data
