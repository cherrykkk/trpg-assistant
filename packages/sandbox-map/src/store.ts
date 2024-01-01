import { reactive, ref } from "vue";
import { createMapInfoTemplate } from "./useSandboxPainter";

export const mapInstance = reactive(createMapInfoTemplate());
