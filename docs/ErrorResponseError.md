
# ErrorResponseError


## Properties

Name | Type
------------ | -------------
`message` | string
`type` | string
`param` | string
`code` | string

## Example

```typescript
import type { ErrorResponseError } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "message": null,
  "type": null,
  "param": null,
  "code": null,
} satisfies ErrorResponseError

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ErrorResponseError
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


