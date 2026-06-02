
# FileList


## Properties

Name | Type
------------ | -------------
`object` | string
`data` | [Array&lt;FileObject&gt;](FileObject.md)
`has_more` | boolean
`first_id` | string
`last_id` | string

## Example

```typescript
import type { FileList } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "object": null,
  "data": null,
  "has_more": null,
  "first_id": null,
  "last_id": null,
} satisfies FileList

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileList
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


