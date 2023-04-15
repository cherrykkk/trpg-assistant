import { defineStore } from "pinia";
import { Scene } from "@/types";

export const useSceneStore = defineStore("scene", {
  state: () => ({
    scenes: [] as Scene[],
    currentScene: null as null | Scene,
    isEditing: false,
    sceneTree: [] as Scene[],
  }),
  getters: {
    availableScenes(): Scene[] {
      if (this.currentScene) {
        const fatherName = this.currentScene.name;
        return this.scenes.filter((scene) => scene.father === fatherName);
      } else {
        return this.scenes.filter((scene) => !scene.father);
      }
    },
    path(): Scene[] {
      const scenePath: Scene[] = [];
      let currentScene: Scene | null = this.currentScene;
      while (currentScene) {
        scenePath.unshift(currentScene);
        const fatherName = currentScene.father;
        currentScene = this.scenes.find((e) => e.name === fatherName) || null;
        if (scenePath.length > 20) {
          console.log("层级堆叠太高，请检查是否有重名场景");
          break;
        }
      }
      return scenePath;
    },
  },
  actions: {
    refresh() {
      if (!this.currentScene) {
        this.currentScene = this.scenes[0];
      }
      this.sortTree();
    },
    back() {
      const father = this.scenes.find((scene) => scene.name === this.currentScene?.father);
      this.currentScene = father || null;
    },
    updateScene(property: { [key: string]: any }, _id: string) {
      fetch(`/api/scene/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(property),
      }).then((res) => {
        this.refresh();
      });
    },
    createNewScene(sceneData: { [key: string]: any }) {
      fetch("/api/createScene", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sceneData),
      }).then((res) => {
        this.refresh();
      });
    },
    sortTree() {
      const nameToScene: Map<string, Scene> = new Map();
      this.scenes.forEach((scene) => {
        scene.children = [];
        nameToScene.set(scene.name, scene);
        this.sceneTree.push(scene);
      });

      for (let i = 0; i < this.sceneTree.length; i++) {
        const scene = this.sceneTree[i];
        if (scene.father) {
          const fatherScene = nameToScene.get(scene.father);
          if (fatherScene) {
            fatherScene.children.push(scene);
            this.sceneTree.splice(i, 1);
            i--;
          }
        }
      }
    },
  },
});

useSceneStore().refresh();
