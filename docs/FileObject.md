
# FileObject


## Properties

Name | Type
------------ | -------------
`id` | string
`object` | string
`bytes` | number
`created_at` | number
`expires_at` | number
`filename` | string
`purpose` | string

## Example

```typescript
import type { FileObject } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "object": null,
  "bytes": null,
  "created_at": null,
  "expires_at": null,
  "filename": null,
  "purpose": null,
} satisfies FileObject

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FileObject
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


