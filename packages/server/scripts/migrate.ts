import { Binary } from "mongodb";
import { OtherTypeInfo, ResourceBlobEntity } from "@trpg/shared";

async function otherTypesDocToBlobDoc(ot: OtherTypeInfo): Promise<ResourceBlobEntity | null> {
  if (ot.data) {
    const blob = await (await fetch(ot.data as string)).blob();
    const mimeType = blob.type;
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const binary = new Binary(bytes);
    return {
      _id: ot._id,
      resourceType: "image",
      data: binary,
      mimeType,
      gameInstanceId: ot.gameInstanceId,
    };
  }
  return null;
}
