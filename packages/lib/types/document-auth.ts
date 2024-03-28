import { z } from 'zod';

/**
 * All the available types of document authentication options for both access and action.
 */
export const ZDocumentAuthTypesSchema = z.enum(['ACCOUNT', 'EXPLICIT_NONE']);
export const DocumentAuth = ZDocumentAuthTypesSchema.Enum;

const ZDocumentAuthAccountSchema = z.object({
  type: z.literal(DocumentAuth.ACCOUNT),
});

const ZDocumentAuthExplicitNoneSchema = z.object({
  type: z.literal(DocumentAuth.EXPLICIT_NONE),
});

/**
 * All the document auth methods for both accessing and actioning.
 */
export const ZDocumentAuthMethodsSchema = z.discriminatedUnion('type', [
  ZDocumentAuthAccountSchema,
  ZDocumentAuthExplicitNoneSchema,
]);

/**
 * The global document access auth methods.
 *
 * Must keep these two in sync.
 */
export const ZDocumentAccessAuthSchema = z.discriminatedUnion('type', [ZDocumentAuthAccountSchema]);
export const ZDocumentAccessAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT]);

/**
 * The global document action auth methods.
 *
 * Must keep these two in sync.
 */
export const ZDocumentActionAuthSchema = z.discriminatedUnion('type', [ZDocumentAuthAccountSchema]); // Todo: Add passkeys here.
export const ZDocumentActionAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT]);

/**
 * The recipient access auth methods.
 *
 * Must keep these two in sync.
 */
export const ZRecipientAccessAuthSchema = z.discriminatedUnion('type', [
  ZDocumentAuthAccountSchema,
]);
export const ZRecipientAccessAuthTypesSchema = z.enum([DocumentAuth.ACCOUNT]);

/**
 * The recipient action auth methods.
 *
 * Must keep these two in sync.
 */
export const ZRecipientActionAuthSchema = z.discriminatedUnion('type', [
  ZDocumentAuthAccountSchema, // Todo: Add passkeys here.
  ZDocumentAuthExplicitNoneSchema,
]);
export const ZRecipientActionAuthTypesSchema = z.enum([
  DocumentAuth.ACCOUNT,
  DocumentAuth.EXPLICIT_NONE,
]);

export const DocumentAccessAuth = ZDocumentAccessAuthTypesSchema.Enum;
export const DocumentActionAuth = ZDocumentActionAuthTypesSchema.Enum;
export const RecipientAccessAuth = ZRecipientAccessAuthTypesSchema.Enum;
export const RecipientActionAuth = ZRecipientActionAuthTypesSchema.Enum;

/**
 * Authentication options attached to the document.
 */
export const ZDocumentAuthOptionsSchema = z.preprocess(
  (unknownValue) => {
    if (unknownValue) {
      return unknownValue;
    }

    return {
      globalAccessAuth: null,
      globalActionAuth: null,
    };
  },
  z.object({
    globalAccessAuth: ZDocumentAccessAuthTypesSchema.nullable(),
    globalActionAuth: ZDocumentActionAuthTypesSchema.nullable(),
  }),
);

/**
 * Authentication options attached to the recipient.
 */
export const ZRecipientAuthOptionsSchema = z.preprocess(
  (unknownValue) => {
    if (unknownValue) {
      return unknownValue;
    }

    return {
      accessAuth: null,
      actionAuth: null,
    };
  },
  z.object({
    accessAuth: ZRecipientAccessAuthTypesSchema.nullable(),
    actionAuth: ZRecipientActionAuthTypesSchema.nullable(),
  }),
);

export type TDocumentAuth = z.infer<typeof ZDocumentAuthTypesSchema>;
export type TDocumentAuthMethods = z.infer<typeof ZDocumentAuthMethodsSchema>;
export type TDocumentAuthOptions = z.infer<typeof ZDocumentAuthOptionsSchema>;
export type TDocumentAccessAuth = z.infer<typeof ZDocumentAccessAuthSchema>;
export type TDocumentAccessAuthTypes = z.infer<typeof ZDocumentAccessAuthTypesSchema>;
export type TDocumentActionAuth = z.infer<typeof ZDocumentActionAuthSchema>;
export type TDocumentActionAuthTypes = z.infer<typeof ZDocumentActionAuthTypesSchema>;
export type TRecipientAccessAuth = z.infer<typeof ZRecipientAccessAuthSchema>;
export type TRecipientAccessAuthTypes = z.infer<typeof ZRecipientAccessAuthTypesSchema>;
export type TRecipientActionAuth = z.infer<typeof ZRecipientActionAuthSchema>;
export type TRecipientActionAuthTypes = z.infer<typeof ZRecipientActionAuthTypesSchema>;
export type TRecipientAuthOptions = z.infer<typeof ZRecipientAuthOptionsSchema>;
