
# CreateUploadRequest


## Properties

Name | Type
------------ | -------------
`filename` | string
`purpose` | string
`bytes` | number
`mime_type` | string

## Example

```typescript
import type { CreateUploadRequest } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "filename": null,
  "purpose": null,
  "bytes": null,
  "mime_type": null,
} satisfies CreateUploadRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateUploadRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


