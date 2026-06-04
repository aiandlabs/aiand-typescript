
# CreateCompletionResponseChoicesInner


## Properties

Name | Type
------------ | -------------
`text` | string
`index` | number
`logprobs` | [CreateCompletionResponseChoicesInnerLogprobs](CreateCompletionResponseChoicesInnerLogprobs.md)
`finish_reason` | string

## Example

```typescript
import type { CreateCompletionResponseChoicesInner } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "text": null,
  "index": null,
  "logprobs": null,
  "finish_reason": null,
} satisfies CreateCompletionResponseChoicesInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCompletionResponseChoicesInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


