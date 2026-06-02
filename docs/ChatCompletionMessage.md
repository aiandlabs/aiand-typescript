
# ChatCompletionMessage


## Properties

Name | Type
------------ | -------------
`role` | string
`content` | [ChatCompletionMessageAnyOfContent](ChatCompletionMessageAnyOfContent.md)
`name` | string
`refusal` | string
`tool_calls` | [Array&lt;ChatCompletionMessageAnyOf3ToolCallsInner&gt;](ChatCompletionMessageAnyOf3ToolCallsInner.md)
`tool_call_id` | string

## Example

```typescript
import type { ChatCompletionMessage } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "content": null,
  "name": null,
  "refusal": null,
  "tool_calls": null,
  "tool_call_id": null,
} satisfies ChatCompletionMessage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChatCompletionMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


