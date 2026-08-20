import type { EraWorldObject } from "@/data/eras";

export type ObjectActionResult = {
  object: EraWorldObject;
  handled: boolean;
};

/**
 * Scaffold for era object interactions.
 * Returns whether the action was recognized — UI layers can react accordingly.
 */
export function handleEraObjectAction(
  objects: EraWorldObject[],
  action: string
): ObjectActionResult | null {
  const object = objects.find((item) => item.action === action);
  if (!object) {
    return null;
  }

  return { object, handled: true };
}

export function getEraObjectByName(
  objects: EraWorldObject[],
  name: string
): EraWorldObject | undefined {
  return objects.find((item) => item.name === name);
}
