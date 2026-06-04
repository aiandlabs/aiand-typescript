
# CreateResponseRequestToolChoice

How the model should select which tool to use. \"none\", \"auto\", \"required\", or a specific tool.

## Properties

Name | Type
------------ | -------------
`type` | string
`name` | string

## Example

```typescript
import type { CreateResponseRequestToolChoice } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "name": null,
} satisfies CreateResponseRequestToolChoice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateResponseRequestToolChoice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


