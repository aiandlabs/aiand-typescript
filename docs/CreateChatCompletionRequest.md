
# CreateChatCompletionRequest


## Properties

Name | Type
------------ | -------------
`model` | string
`messages` | [Array&lt;ChatCompletionMessage&gt;](ChatCompletionMessage.md)
`stream` | boolean
`stream_options` | [CreateChatCompletionRequestStreamOptions](CreateChatCompletionRequestStreamOptions.md)
`temperature` | number
`top_p` | number
`n` | number
`max_tokens` | number
`max_completion_tokens` | number
`stop` | [CreateChatCompletionRequestStop](CreateChatCompletionRequestStop.md)
`frequency_penalty` | number
`presence_penalty` | number
`logprobs` | boolean
`top_logprobs` | number
`logit_bias` | { [key: string]: number; }
`response_format` | [CreateChatCompletionRequestResponseFormat](CreateChatCompletionRequestResponseFormat.md)
`seed` | number
`tools` | [Array&lt;CreateChatCompletionRequestToolsInner&gt;](CreateChatCompletionRequestToolsInner.md)
`tool_choice` | [CreateChatCompletionRequestToolChoice](CreateChatCompletionRequestToolChoice.md)
`parallel_tool_calls` | boolean
`reasoning_effort` | string
`top_k` | number
`min_p` | number
`repetition_penalty` | number
`min_tokens` | number
`echo` | boolean
`user` | string

## Example

```typescript
import type { CreateChatCompletionRequest } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "model": null,
  "messages": null,
  "stream": null,
  "stream_options": null,
  "temperature": null,
  "top_p": null,
  "n": null,
  "max_tokens": null,
  "max_completion_tokens": null,
  "stop": null,
  "frequency_penalty": null,
  "presence_penalty": null,
  "logprobs": null,
  "top_logprobs": null,
  "logit_bias": null,
  "response_format": null,
  "seed": null,
  "tools": null,
  "tool_choice": null,
  "parallel_tool_calls": null,
  "reasoning_effort": null,
  "top_k": null,
  "min_p": null,
  "repetition_penalty": null,
  "min_tokens": null,
  "echo": null,
  "user": null,
} satisfies CreateChatCompletionRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateChatCompletionRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


