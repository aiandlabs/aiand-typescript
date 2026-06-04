
# CompletionUsage


## Properties

Name | Type
------------ | -------------
`prompt_tokens` | number
`completion_tokens` | number
`total_tokens` | number
`prompt_tokens_details` | [CompletionUsagePromptTokensDetails](CompletionUsagePromptTokensDetails.md)
`completion_tokens_details` | [CompletionUsageCompletionTokensDetails](CompletionUsageCompletionTokensDetails.md)

## Example

```typescript
import type { CompletionUsage } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "prompt_tokens": null,
  "completion_tokens": null,
  "total_tokens": null,
  "prompt_tokens_details": null,
  "completion_tokens_details": null,
} satisfies CompletionUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CompletionUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


