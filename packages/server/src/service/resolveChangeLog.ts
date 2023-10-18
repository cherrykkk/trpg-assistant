import { BasicCollectionStructure, ChangeLog } from "@trpg/shared";

export function resolveChangeLog(
  data: BasicCollectionStructure,
  changerId: string,
  changerName: string
) {
  const changeLog = {
    ...data,
    changeTime: Date.now(),
    changerId,
    changerName,
  };

  delete changeLog.changeLogs;

  if (data.changeLogs instanceof Array) {
    data.changeLogs.push(changeLog);
  } else {
    data.changeLogs = [changeLog];
  }
  return data;
}
