
# CreateChatCompletionResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`object` | string
`created` | number
`model` | string
`choices` | [Array&lt;CreateChatCompletionResponseChoicesInner&gt;](CreateChatCompletionResponseChoicesInner.md)
`usage` | [CompletionUsage](CompletionUsage.md)
`system_fingerprint` | string

## Example

```typescript
import type { CreateChatCompletionResponse } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "object": null,
  "created": null,
  "model": null,
  "choices": null,
  "usage": null,
  "system_fingerprint": null,
} satisfies CreateChatCompletionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateChatCompletionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


