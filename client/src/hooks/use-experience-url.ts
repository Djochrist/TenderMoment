import { useState, useEffect } from 'react';
import { experienceSchema, type Experience } from '@shared/schema';

/**
 * A custom hook to manage base64 encoding and decoding of the experience data.
 * This completely eliminates the need for a backend database.
 */
export function useExperienceUrl() {
  const [decodedData, setDecodedData] = useState<Experience | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const dataParam = params.get('data');

      if (!dataParam) {
        return; // No data, stay on home or show empty state
      }

      // 1. Decode Base64
      const jsonString = decodeURIComponent(atob(dataParam));
      
      // 2. Parse JSON
      const rawData = JSON.parse(jsonString);
      
      // 3. Validate against Zod Schema
      const validatedData = experienceSchema.parse(rawData);
      
      setDecodedData(validatedData);
    } catch (err) {
      console.error("Failed to parse experience data:", err);
      setError("Le lien semble invalide ou corrompu.");
    }
  }, []);

  const generateLink = (data: Experience): string => {
    // Validate first just to be sure
    const validated = experienceSchema.parse(data);
    
    // Encode to base64
    const jsonString = JSON.stringify(validated);
    const base64 = btoa(encodeURIComponent(jsonString));
    
    // Generate full URL
    const baseUrl = window.location.origin;
    return `${baseUrl}/experience?data=${base64}`;
  };

  return { decodedData, error, generateLink };
}
