import { ChangeLog } from "@trpg/shared";

export function resolveChangeLog<T extends { changeLogs: ChangeLog<T>[] }>(
  data: T,
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

  data.changeLogs.push(changeLog);
  return data;
}
