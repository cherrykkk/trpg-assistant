import type { ClientEvents, CollectionKey, CollectionStructure, ServerEvents } from "@trpg/shared";
import type { Socket } from "socket.io-client";
import { reactive } from "vue";

export function getReactiveCollections(
  key: CollectionKey[],
  socket: Socket<ServerEvents, ClientEvents>
) {
  const collections = reactive({}) as { [P in CollectionKey]: CollectionStructure[P][] };
  key.forEach((key) => {
    collections[key] = JSON.parse(localStorage.getItem(`data: ${key}`) ?? "[]");
    socket.on(`data: ${key}`, (data: any) => {
      collections[key] = data;
      localStorage.setItem(`data: ${key}`, JSON.stringify(data));
    });
  });
  return collections;
}
