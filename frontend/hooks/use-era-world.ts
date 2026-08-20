import { useCallback, useEffect, useMemo, useState } from "react";
import type { EraConfig } from "@/data/eras";
import { useEraAmbientSound } from "@/lib/era-world/ambient-sound";
import { handleEraObjectAction } from "@/lib/era-world/objects";
import {
  buildQuotePool,
  getNextQuoteIndex,
  getQuoteAtIndex,
} from "@/lib/era-world/quotes";

export function useEraWorld(era: EraConfig) {
  const quotePool = useMemo(
    () => buildQuotePool(era.world.quotes),
    [era.world.quotes]
  );
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [activeObjectAction, setActiveObjectAction] = useState<string | null>(
    null
  );

  const { play, stop } = useEraAmbientSound(era.world.ambientSound);

  useEffect(() => {
    setQuoteIndex(0);
    setIsInteractionActive(false);
    setActiveObjectAction(null);
    stop();
  }, [era.id, stop]);

  const currentQuote = getQuoteAtIndex(
    quotePool,
    quoteIndex,
    era.world.quotes.primary
  );

  const cycleQuote = useCallback(() => {
    setQuoteIndex((prev) => getNextQuoteIndex(prev, quotePool.length));
  }, [quotePool.length]);

  const handleInteraction = useCallback(async () => {
    setIsInteractionActive(true);
    cycleQuote();

    const objectResult = handleEraObjectAction(
      era.world.objects,
      era.interaction.action
    );
    if (objectResult) {
      setActiveObjectAction(objectResult.object.action);
    }

    await play();
  }, [cycleQuote, era.interaction.action, era.world.objects, play]);

  const hasWorldContent = Boolean(
    era.world.character && era.world.quotes.primary
  );
  const hasInteraction = Boolean(era.interaction.button);
  const hasObjects = era.world.objects.length > 0;

  return {
    currentQuote,
    isInteractionActive,
    activeObjectAction,
    handleInteraction,
    hasWorldContent,
    hasInteraction,
    hasObjects,
    objects: era.world.objects,
  };
}
