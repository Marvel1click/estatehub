"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "estatehub:saved-properties";

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
      setSavedIds(Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : []);
    } catch {
      setSavedIds([]);
    } finally {
      setReady(true);
    }
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) => {
      const next = current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("estatehub:saved", { detail: next }));
      return next;
    });
  }, []);

  return { savedIds, toggleSaved, ready };
}
