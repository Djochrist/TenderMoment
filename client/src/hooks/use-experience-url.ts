import { useState, useEffect } from 'react';
import { experienceSchema, type Experience } from '@shared/schema';

/**
 * A custom hook to manage base64 encoding and decoding of the experience data.
 * This completely eliminates the need for a backend database.
 */
export function useExperienceUrl() {
  const [decodedData, setDecodedData] = useState<Experience | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionKey = "tendermoment:experience:v1";

  const base64UrlEncode = (input: ArrayBuffer | Uint8Array): string => {
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  };

  const base64UrlDecodeToBytes = (input: string): Uint8Array => {
    const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  };

  const encryptExperience = async (data: Experience): Promise<{ v: string; k: string; iv: string; c: string }> => {
    const validated = experienceSchema.parse(data);
    const plaintext = new TextEncoder().encode(JSON.stringify(validated));

    const keyBytes = crypto.getRandomValues(new Uint8Array(32)); // 256-bit
    const ivBytes = crypto.getRandomValues(new Uint8Array(12)); // recommended for AES-GCM

    const key = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
    const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, key, plaintext);

    return {
      v: "1",
      k: base64UrlEncode(keyBytes),
      iv: base64UrlEncode(ivBytes),
      c: base64UrlEncode(ciphertext),
    };
  };

  const decryptExperience = async (payload: { k: string; iv: string; c: string }): Promise<Experience> => {
    const keyBytes = base64UrlDecodeToBytes(payload.k);
    const ivBytes = base64UrlDecodeToBytes(payload.iv);
    const cipherBytes = base64UrlDecodeToBytes(payload.c);

    const key = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["decrypt"]);
    const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBytes }, key, cipherBytes);
    const jsonString = new TextDecoder().decode(plaintext);
    return experienceSchema.parse(JSON.parse(jsonString));
  };

  useEffect(() => {
    (async () => {
      try {
        const isExperienceRoute = window.location.pathname.startsWith("/experience");

        // New format (preferred): encrypted payload in URL hash so it isn't sent to the server.
        // Example: /experience#v=1&k=...&iv=...&c=...
        const hash = window.location.hash.startsWith("#")
          ? window.location.hash.slice(1)
          : window.location.hash;
        const hashParams = new URLSearchParams(hash);
        const v = hashParams.get("v");
        const k = hashParams.get("k");
        const iv = hashParams.get("iv");
        const c = hashParams.get("c");

        if (v === "1" && k && iv && c) {
          const validatedData = await decryptExperience({ k, iv, c });
          setDecodedData(validatedData);

          if (isExperienceRoute) {
            sessionStorage.setItem(sessionKey, JSON.stringify(validatedData));
            if (window.location.hash || window.location.search) {
              window.history.replaceState(null, "", window.location.pathname);
            }
          }
          return;
        }

        // Legacy format (backward compatible): base64 JSON in query string.
        const params = new URLSearchParams(window.location.search);
        const dataParam = params.get("data");
        if (!dataParam) {
          if (isExperienceRoute) {
            const stored = sessionStorage.getItem(sessionKey);
            if (stored) {
              const validatedData = experienceSchema.parse(JSON.parse(stored));
              setDecodedData(validatedData);
            }
          }
          return;
        }

        const jsonString = decodeURIComponent(atob(dataParam));
        const rawData = JSON.parse(jsonString);
        const validatedData = experienceSchema.parse(rawData);
        setDecodedData(validatedData);

        if (isExperienceRoute) {
          sessionStorage.setItem(sessionKey, JSON.stringify(validatedData));
          if (window.location.hash || window.location.search) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      } catch (err) {
        console.error("Failed to parse experience data:", err);
        setError("Le lien semble invalide ou corrompu.");
      }
    })();
  }, []);

  const generateLink = async (data: Experience): Promise<string> => {
    const payload = await encryptExperience(data);
    const baseUrl = window.location.origin;
    const fragment = new URLSearchParams(payload).toString();
    return `${baseUrl}/experience#${fragment}`;
  };

  return { decodedData, error, generateLink };
}
