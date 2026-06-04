
# ChatCompletionMessageAnyOf3


## Properties

Name | Type
------------ | -------------
`role` | string
`content` | [ChatCompletionMessageAnyOf3Content](ChatCompletionMessageAnyOf3Content.md)
`refusal` | string
`name` | string
`tool_calls` | [Array&lt;ChatCompletionMessageAnyOf3ToolCallsInner&gt;](ChatCompletionMessageAnyOf3ToolCallsInner.md)

## Example

```typescript
import type { ChatCompletionMessageAnyOf3 } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "content": null,
  "refusal": null,
  "name": null,
  "tool_calls": null,
} satisfies ChatCompletionMessageAnyOf3

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChatCompletionMessageAnyOf3
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


