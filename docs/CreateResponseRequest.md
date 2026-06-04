
# CreateResponseRequest


## Properties

Name | Type
------------ | -------------
`model` | string
`input` | [ResponseInput](ResponseInput.md)
`instructions` | string
`stream` | boolean
`temperature` | number
`top_p` | number
`max_output_tokens` | number
`tools` | [Array&lt;CreateResponseRequestToolsInner&gt;](CreateResponseRequestToolsInner.md)
`tool_choice` | [CreateResponseRequestToolChoice](CreateResponseRequestToolChoice.md)
`parallel_tool_calls` | boolean
`reasoning` | [CreateResponseRequestReasoning](CreateResponseRequestReasoning.md)
`truncation` | string
`previous_response_id` | string
`store` | boolean
`metadata` | { [key: string]: string; }
`text` | [CreateResponseRequestText](CreateResponseRequestText.md)
`top_logprobs` | number
`seed` | number
`stop` | [CreateResponseRequestStop](CreateResponseRequestStop.md)
`top_k` | number
`repetition_penalty` | number
`min_tokens` | number

## Example

```typescript
import type { CreateResponseRequest } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "model": null,
  "input": null,
  "instructions": null,
  "stream": null,
  "temperature": null,
  "top_p": null,
  "max_output_tokens": null,
  "tools": null,
  "tool_choice": null,
  "parallel_tool_calls": null,
  "reasoning": null,
  "truncation": null,
  "previous_response_id": null,
  "store": null,
  "metadata": null,
  "text": null,
  "top_logprobs": null,
  "seed": null,
  "stop": null,
  "top_k": null,
  "repetition_penalty": null,
  "min_tokens": null,
} satisfies CreateResponseRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateResponseRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


