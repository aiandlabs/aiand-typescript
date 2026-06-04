
# CompletionUsageCompletionTokensDetails


## Properties

Name | Type
------------ | -------------
`reasoning_tokens` | number
`audio_tokens` | number
`accepted_prediction_tokens` | number
`rejected_prediction_tokens` | number

## Example

```typescript
import type { CompletionUsageCompletionTokensDetails } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "reasoning_tokens": null,
  "audio_tokens": null,
  "accepted_prediction_tokens": null,
  "rejected_prediction_tokens": null,
} satisfies CompletionUsageCompletionTokensDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CompletionUsageCompletionTokensDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


