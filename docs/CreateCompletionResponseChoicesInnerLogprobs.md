
# CreateCompletionResponseChoicesInnerLogprobs


## Properties

Name | Type
------------ | -------------
`tokens` | Array&lt;string&gt;
`token_logprobs` | Array&lt;number&gt;
`top_logprobs` | Array&lt;{ [key: string]: number; }&gt;
`text_offset` | Array&lt;number&gt;

## Example

```typescript
import type { CreateCompletionResponseChoicesInnerLogprobs } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "tokens": null,
  "token_logprobs": null,
  "top_logprobs": null,
  "text_offset": null,
} satisfies CreateCompletionResponseChoicesInnerLogprobs

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCompletionResponseChoicesInnerLogprobs
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


