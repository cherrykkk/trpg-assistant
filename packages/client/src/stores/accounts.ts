import { ref } from "vue";

export interface Account {
  id: string;
  role: "master" | "player";
  name: string;
  lastTime: number;
}

function getAccounts(): Account[] {
  try {
    return JSON.parse(localStorage.getItem("accounts") ?? "[]");
  } catch {
    return [];
  }
}

export const localAccounts = ref(getAccounts());
export const saveAccount = (account: Account) => {
  const accounts = getAccounts();

  const existAccountIndex = accounts.findIndex((e) => e.id === account.id);

  if (existAccountIndex !== -1) {
    accounts.splice(existAccountIndex, 1, account);
  } else {
    accounts.unshift(account);
  }

  localStorage.setItem("accounts", JSON.stringify(accounts));
  localAccounts.value = accounts;
};
