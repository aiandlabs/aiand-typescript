#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = process.argv[2] ?? process.cwd();
const chatMessagePath = join(rootDir, "src", "models", "ChatCompletionMessage.ts");

patchChatCompletionMessage();

function patchChatCompletionMessage() {
  const original = readFileSync(chatMessagePath, "utf8");
  let patched = original;

  const oldDeclaration = `/**
 * 
 * @export
 * @interface ChatCompletionMessage
 */
export interface ChatCompletionMessage {
    /**
     * 
     * @type {ChatCompletionMessageRoleEnum}
     * @memberof ChatCompletionMessage
     */
    role: ChatCompletionMessageRoleEnum;
    /**
     * 
     * @type {ChatCompletionMessageAnyOfContent}
     * @memberof ChatCompletionMessage
     */
    content: ChatCompletionMessageAnyOfContent;
    /**
     * 
     * @type {string}
     * @memberof ChatCompletionMessage
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof ChatCompletionMessage
     */
    refusal?: string;
    /**
     * 
     * @type {Array<ChatCompletionMessageAnyOf3ToolCallsInner>}
     * @memberof ChatCompletionMessage
     */
    tool_calls?: Array<ChatCompletionMessageAnyOf3ToolCallsInner>;
    /**
     * 
     * @type {string}
     * @memberof ChatCompletionMessage
     */
    tool_call_id: string;
}


/**
 * @export
 */
export const ChatCompletionMessageRoleEnum = {
    Tool: 'tool'
} as const;
export type ChatCompletionMessageRoleEnum = typeof ChatCompletionMessageRoleEnum[keyof typeof ChatCompletionMessageRoleEnum];


/**
 * Check if a given object implements the ChatCompletionMessage interface.
 */
export function instanceOfChatCompletionMessage(value: object): value is ChatCompletionMessage {
    if (!('role' in value) || value['role'] === undefined) return false;
    if (!('content' in value) || value['content'] === undefined) return false;
    if (!('tool_call_id' in value) || value['tool_call_id'] === undefined) return false;
    return true;
}
`;

  const newDeclaration = `/**
 * 
 * @export
 */
export type ChatCompletionMessage =
    | ChatCompletionMessageAnyOf
    | ChatCompletionMessageAnyOf1
    | ChatCompletionMessageAnyOf2
    | ChatCompletionMessageAnyOf3
    | ChatCompletionMessageAnyOf4;


/**
 * Check if a given object implements the ChatCompletionMessage type.
 */
export function instanceOfChatCompletionMessage(value: object): value is ChatCompletionMessage {
    return 'role' in value;
}
`;

  patched = replaceIfNeeded(
    patched,
    oldDeclaration,
    newDeclaration,
    "ChatCompletionMessage declaration",
  );

  patched = replaceIfNeeded(
    patched,
    "export function ChatCompletionMessageToJSONTyped(value?: ChatCompletionMessage | null, ignoreDiscriminator: boolean = false): any {",
    "export function ChatCompletionMessageToJSONTyped(value?: any | null, ignoreDiscriminator: boolean = false): any {",
    "ChatCompletionMessageToJSONTyped signature",
  );

  if (patched !== original) {
    writeFileSync(chatMessagePath, patched);
  }
}

function replaceIfNeeded(input, search, replacement, label) {
  if (input.includes(search)) {
    return input.replace(search, replacement);
  }

  if (input.includes(replacement)) {
    return input;
  }

  throw new Error(`Could not apply generated-client patch: ${label} was not found.`);
}
