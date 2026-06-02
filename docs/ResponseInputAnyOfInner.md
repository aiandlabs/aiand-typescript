
# ResponseInputAnyOfInner


## Properties

Name | Type
------------ | -------------
`role` | string
`content` | [ResponseInputAnyOfInnerAnyOfContent](ResponseInputAnyOfInnerAnyOfContent.md)
`type` | string
`call_id` | string
`output` | string
`id` | string

## Example

```typescript
import type { ResponseInputAnyOfInner } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "role": null,
  "content": null,
  "type": null,
  "call_id": null,
  "output": null,
  "id": null,
} satisfies ResponseInputAnyOfInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResponseInputAnyOfInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


