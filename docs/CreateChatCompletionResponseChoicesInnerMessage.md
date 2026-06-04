
# CreateChatCompletionResponseChoicesInnerMessage


## Properties

Name | Type
------------ | -------------
`role` | string
`content` | string
`refusal` | string
`tool_calls` | [Array&lt;ChatCompletionMessageAnyOf3ToolCallsInner&gt;](ChatCompletionMessageAnyOf3ToolCallsInner.md)
`annotations` | [Array&lt;CreateChatCompletionResponseChoicesInnerMessageAnnotationsInner&gt;](CreateChatCompletionResponseChoicesInnerMessageAnnotationsInner.md)

## Example

```typescript
import type { CreateChatCompletionResponseChoicesInnerMessage } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "content": null,
  "refusal": null,
  "tool_calls": null,
  "annotations": null,
} satisfies CreateChatCompletionResponseChoicesInnerMessage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateChatCompletionResponseChoicesInnerMessage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


