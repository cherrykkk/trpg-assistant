import { test, expect, describe } from "vitest";
import { useMongoDB } from "../connect";
import { ObjectId } from "mongodb";
// import { io, Socket } from "socket.io-client";
import { initSocket } from "../socket-io";
import type { ClientEvents, ServerEvents } from "@trpg/shared";
const gameInstanceId = "6446094202fe8565888799c3";

let testGameInstanceId = "";

describe("test db", async () => {
  const { collections } = await useMongoDB();
  test("string _id", () => {
    collections.games.findOne({ _id: "6446094202fe8565888799c3" });
  });

  // test("socket", async () => {
  //   initSocket(collections);
  //   const socket: Socket<ServerEvents, ClientEvents> = io(`127.0.0.1:3333`);

  //   socket.on("connect", () => {
  //     console.log("connect");
  //     socket.emit("signIn: signInAsDM", "6446094202fe8565888799c3");
  //   });
  // });
});
