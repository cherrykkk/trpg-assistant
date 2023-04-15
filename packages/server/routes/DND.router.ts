// External Dependencies
import * as express from "express";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import * as bodyParser from "body-parser";

// Global Config
export const DNDRouter = express.Router();

DNDRouter.use(bodyParser.urlencoded({ extended: true }));
DNDRouter.use(bodyParser.json({ limit: "10mb" }));

// GET
DNDRouter.get("/allPlayers", async (_req: Request, res: Response) => {
  try {
    const players = await collections.characters.find({}).toArray();

    res.status(200).send(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

DNDRouter.get("/getSpellDictionary", async (_req: Request, res: Response) => {
  try {
    const players = await collections.spells.find({}).toArray();

    res.status(200).send(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

DNDRouter.get("/getAllScenes", async (_req: Request, res: Response) => {
  try {
    const players = await collections.scenes.find({}).toArray();

    res.status(200).send(players);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST
DNDRouter.post("/createCharacter", async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const newCharacter = req.body;
    const result = await collections.characters.insertOne(newCharacter);

    result
      ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new game.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

DNDRouter.post("/createScene", async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const newScene = req.body;
    const result = await collections.scenes.insertOne(newScene);

    result
      ? res.status(201).send(`Successfully created a new scene with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new scene.");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

// PUT
DNDRouter.put("/character/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    // @ts-ignore
    const updatedCharacter = req.body;

    const query = { _id: new ObjectId(id) };

    const result = await collections.characters.updateOne(query, { $set: updatedCharacter });

    result
      ? res.status(200).send(`Successfully updated character with id ${id}`)
      : res.status(304).send(`character with id: ${id} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

DNDRouter.put("/scene/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    // @ts-ignore
    const updatedScene = req.body;

    const query = { _id: new ObjectId(id) };

    const result = await collections.scenes.updateOne(query, { $set: updatedScene });

    result
      ? res.status(200).send(`Successfully updated scene with id ${id}`)
      : res.status(304).send(`scene with id: ${id} not updated`);
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

// DELETE
DNDRouter.delete("/character/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.characters.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed game with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove game with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Game with id ${id} does not exist`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
