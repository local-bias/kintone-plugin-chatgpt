import { isDev } from '@/lib/global';
import { atom } from 'jotai';
import { providerTypeAtom } from './plugin';
import { OPENAI_MODELS, OPENROUTER_ENDPOINT_MODELS } from '@/lib/static';
import { OpenrouterAvailableModelsResponseSchema } from '@/schema/ai';
import { derive } from 'jotai-derive';

export const openrouterListAvailableModelsAtom = atom(async () => {
  const response = await fetch(OPENROUTER_ENDPOINT_MODELS);

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  const data = await response.json();

  if (isDev) {
    console.log('openrouterListAvailableModelsAtom', data);
  }

  const parsed = OpenrouterAvailableModelsResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }
  const { data: parsedData } = parsed;

  return parsedData.data;
});

export const supportedOpenrouterModelsAtom = derive(
  [openrouterListAvailableModelsAtom],
  (models) => {
    return models.filter((model) => {
      if (!model.architecture.output_modalities.includes('text')) {
        return false;
      }
      if (!model.architecture.input_modalities.includes('text')) {
        return false;
      }
      return true;
    });
  }
);

export const priceFreeOpenrouterModelsAtom = derive([supportedOpenrouterModelsAtom], (models) => {
  return models.filter((model) => {
    return model.pricing.completion === '0' && model.pricing.prompt === '0';
  });
});

export const selectableModelsAtom = atom(async (get) => {
  const providerType = get(providerTypeAtom);

  if (providerType === 'openai') {
    return OPENAI_MODELS;
  }

  const openrouterModels = await get(supportedOpenrouterModelsAtom);

  return openrouterModels.map((model) => model.id);
});
