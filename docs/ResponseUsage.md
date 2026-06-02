
# ResponseUsage


## Properties

Name | Type
------------ | -------------
`input_tokens` | number
`output_tokens` | number
`total_tokens` | number
`input_tokens_details` | [ResponseUsageInputTokensDetails](ResponseUsageInputTokensDetails.md)
`output_tokens_details` | [ResponseUsageOutputTokensDetails](ResponseUsageOutputTokensDetails.md)

## Example

```typescript
import type { ResponseUsage } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "input_tokens": null,
  "output_tokens": null,
  "total_tokens": null,
  "input_tokens_details": null,
  "output_tokens_details": null,
} satisfies ResponseUsage

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResponseUsage
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


