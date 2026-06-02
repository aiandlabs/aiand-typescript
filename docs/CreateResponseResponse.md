
# CreateResponseResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`object` | string
`status` | string
`created_at` | number
`completed_at` | number
`model` | string
`output` | [Array&lt;CreateResponseResponseOutputInner&gt;](CreateResponseResponseOutputInner.md)
`error` | [CreateResponseResponseError](CreateResponseResponseError.md)
`incomplete_details` | [CreateResponseResponseIncompleteDetails](CreateResponseResponseIncompleteDetails.md)
`instructions` | string
`metadata` | { [key: string]: string; }
`temperature` | number
`top_p` | number
`max_output_tokens` | number
`tools` | Array&lt;{ [key: string]: any; }&gt;
`tool_choice` | [CreateResponseResponseToolChoice](CreateResponseResponseToolChoice.md)
`parallel_tool_calls` | boolean
`truncation` | string
`previous_response_id` | string
`reasoning` | [CreateResponseResponseReasoning](CreateResponseResponseReasoning.md)
`text` | { [key: string]: any; }
`top_logprobs` | number
`usage` | [ResponseUsage](ResponseUsage.md)

## Example

```typescript
import type { CreateResponseResponse } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "object": null,
  "status": null,
  "created_at": null,
  "completed_at": null,
  "model": null,
  "output": null,
  "error": null,
  "incomplete_details": null,
  "instructions": null,
  "metadata": null,
  "temperature": null,
  "top_p": null,
  "max_output_tokens": null,
  "tools": null,
  "tool_choice": null,
  "parallel_tool_calls": null,
  "truncation": null,
  "previous_response_id": null,
  "reasoning": null,
  "text": null,
  "top_logprobs": null,
  "usage": null,
} satisfies CreateResponseResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateResponseResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


