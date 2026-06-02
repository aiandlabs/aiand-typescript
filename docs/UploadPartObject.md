
# UploadPartObject


## Properties

Name | Type
------------ | -------------
`id` | string
`object` | string
`upload_id` | string
`created_at` | number

## Example

```typescript
import type { UploadPartObject } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "object": null,
  "upload_id": null,
  "created_at": null,
} satisfies UploadPartObject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UploadPartObject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


