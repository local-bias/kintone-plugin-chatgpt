import { z } from 'zod';

const MODALITY_TYPES = ['text', 'image', 'audio', 'video', 'file'] as const;

const ModalityTypeSchema = z.enum(MODALITY_TYPES);

const OpenrouterAvailableModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  created: z.number(),
  context_length: z.number(),
  architecture: z.object({
    modality: z.string(),
    input_modalities: z.array(ModalityTypeSchema),
    output_modalities: z.array(ModalityTypeSchema),
    tokenizer: z.string(),
    instruct_type: z.string().nullable(),
  }),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
    request: z.string().optional(),
    image: z.string().optional(),
    web_search: z.string().optional(),
    internal_reasoning: z.string().optional(),
  }),
});
export type OpenrouterAvailableModel = z.infer<typeof OpenrouterAvailableModelSchema>;

export const OpenrouterAvailableModelsResponseSchema = z.object({
  data: z.array(OpenrouterAvailableModelSchema),
});
export type OpenrouterAvailableModelsResponse = z.infer<
  typeof OpenrouterAvailableModelsResponseSchema
>;
