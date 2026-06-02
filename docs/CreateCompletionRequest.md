
# CreateCompletionRequest


## Properties

Name | Type
------------ | -------------
`model` | string
`prompt` | [CreateCompletionRequestPrompt](CreateCompletionRequestPrompt.md)
`stream` | boolean
`stream_options` | [CreateChatCompletionRequestStreamOptions](CreateChatCompletionRequestStreamOptions.md)
`temperature` | number
`top_p` | number
`n` | number
`max_tokens` | number
`stop` | [CreateChatCompletionRequestStop](CreateChatCompletionRequestStop.md)
`frequency_penalty` | number
`presence_penalty` | number
`logprobs` | number
`echo` | boolean
`best_of` | number
`suffix` | string
`seed` | number
`user` | string

## Example

```typescript
import type { CreateCompletionRequest } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "model": null,
  "prompt": null,
  "stream": null,
  "stream_options": null,
  "temperature": null,
  "top_p": null,
  "n": null,
  "max_tokens": null,
  "stop": null,
  "frequency_penalty": null,
  "presence_penalty": null,
  "logprobs": null,
  "echo": null,
  "best_of": null,
  "suffix": null,
  "seed": null,
  "user": null,
} satisfies CreateCompletionRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCompletionRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


