
# CreateResponseResponseOutputInner


## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`role` | string
`status` | string
`content` | [Array&lt;CreateResponseResponseOutputInnerAnyOfContentInner&gt;](CreateResponseResponseOutputInnerAnyOfContentInner.md)
`call_id` | string
`name` | string
`arguments` | string
`summary` | Array&lt;{ [key: string]: any; }&gt;

## Example

```typescript
import type { CreateResponseResponseOutputInner } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "role": null,
  "status": null,
  "content": null,
  "call_id": null,
  "name": null,
  "arguments": null,
  "summary": null,
} satisfies CreateResponseResponseOutputInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateResponseResponseOutputInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


