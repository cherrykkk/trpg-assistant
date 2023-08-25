import { defineStore } from "pinia";
import { type SpellInfo } from "@trpg/shared";

export const useSpellsStore = defineStore("spells", {
  state: () => {
    return { count: 0, spellDictionary: [] as SpellInfo[] };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
    getSpellsByClass(dndClass: string) {
      const spellNames = SpellsByClass[translate[dndClass]];
      if (!spellNames) return;

      return spellNames.reduce((total, spellName) => {
        const existedSpell = this.spellDictionary.find(
          (spell) => spell.法术名称.indexOf(spellName) >= 0
        );
        if (existedSpell) {
          total.push(existedSpell);
        }
        return total;
      }, [] as SpellInfo[]);
    },
    getSpellsBySpellNames(spellNames: string[]) {
      return spellNames.reduce((total, spellName) => {
        const existedSpell = this.spellDictionary.find(
          (spell) => spell.法术名称.indexOf(spellName) >= 0
        );
        if (existedSpell) {
          total.push(existedSpell);
        }
        return total;
      }, [] as SpellInfo[]);
    },
  },
});

fetch("/api/getSpellDictionary")
  .then((res) => res.json())
  .then((data) => {
    useSpellsStore().spellDictionary = data;
  });

const SpellsByClass: { [key: string]: string[] } = {
  bard: [
    "Blade Ward",
    "Dancing Lights",
    "Friend",
    "Light",
    "Mage Hand",
    "Mending",
    "Message",
    "Minor Illusion",
    "Prestidigitation",
    "True Strike",
    "Vicious Mockery",
    "Animal Friendship",
    "Bane",
    "Charm Person",
    "Comprehend Languages",
    "Cure Wounds",
    "Detect Magic",
    "Disguise Self",
    "Dissonant Whispers",
    "Faerie Fire",
    "Feather Fall",
    "Healing Word",
    "Heroism",
    "Identify",
    "Illusory Script",
    "Longstrider",
    "Silent Image",
    "Sleep",
    "Speak Width Animal",
    "Tasha's Hideous Laughter",
    "Thunderwave",
    "Unseen Servant",
  ],
  sorcerer: [
    "Acid Splash",
    "Blade Ward",
    "Chill Ward",
    "Dancing Lights",
    "Fire Bolt",
    "Friends",
    "Light",
    "Mage Hand",
    "Mending",
    "Message",
    "Minor Illusion",
    "Poison Spray",
    "Prestidigitation",
    "Ray of Frost",
    "Shocking Grasp",
    "True Strike",
    "Burning Hands",
    "Charm Person",
    "Chromatic Orb",
    "Color Spray",
    "Comprehend Languages",
    "Detect Magic",
    "Disguise Self",
    "Expeditious Retreat",
    "False Life",
    "Feather Fall",
    "Fog Cloud",
    "Jump",
    "Mage Armor",
    "Magic Missile",
    "Ray of Sickness",
    "shield",
    "Silent Image",
    "Sleep",
    "Thunderwave",
    "Witch Bolt",
  ],
  paladin: [
    "Bless",
    "Command",
    "Compelled Duel",
    "Cure Wounds",
    "Detect Evil and Good",
    "Detect Magic",
    "Detect Poison and Disease",
    "Divine Favor",
    "Heroism",
    "Protection from Evil and Good",
    "Purify Food and Drink",
    "Searing Smite",
    "Shield of Faith",
    "Thunderous Smite",
    "Wrathful Smite",
    "Aid",
    "Branding Smite",
    "Find Steed",
    "Lesser Restoration",
    "Locate Object",
    "Magic Weapon",
    "Protection from Poison",
    "Zone of Truth",
  ],
};

const translate: { [key: string]: string } = {
  吟游诗人: "bard",
  术士: "sorcerer",
  圣武士: "paladin",
};

function getSpellSlots(dndClass: string, level: number) {
  const spellSlots = [];

  for (let i = 0; i < 10; i++) {
    spellSlots.push({ max: 0, current: 0 });
  }

  if (level < 3) {
    spellSlots[1].max = level + 1;
  } else {
    spellSlots[1].max = 4;
  }

  if (level === 3) {
    spellSlots[2].max = 2;
  } else if (level > 3) {
    spellSlots[2].max = 3;
  }

  if (level === 5) {
    spellSlots[3].max = 2;
  } else if (level > 5) {
    spellSlots[3].max = 3;
  }

  if (level === 7 || level === 8) {
    spellSlots[4].max = level - 6;
  } else if (level > 3) {
    spellSlots[4].max = 3;
  }

  if (level === 9) {
    spellSlots[5].max = 1;
  } else if (level > 3) {
    spellSlots[5].max = 3;
  }

  if (level >= 11 && level <= 18) {
    spellSlots[6].max = 1;
  } else if (level >= 19) {
    spellSlots[6].max = 2;
  }

  if (level >= 13 && level <= 19) {
    spellSlots[7].max = 1;
  } else if (level === 20) {
    spellSlots[7].max = 2;
  }

  if (level >= 15) {
    spellSlots[8].max = 1;
  }

  if (level >= 17) {
    spellSlots[9].max = 1;
  }

  spellSlots.forEach((slots, level) => {
    if (level > 0) {
      slots.current = slots.max;
    }
  });
}
