
# ListModels200ResponseDataInner


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`object` | string
`created` | number
`owned_by` | string
`provider` | string
`context_window` | number
`capabilities` | Array&lt;string&gt;
`description` | string
`input_per_1m` | string
`output_per_1m` | string

## Example

```typescript
import type { ListModels200ResponseDataInner } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "object": null,
  "created": null,
  "owned_by": ai&,
  "provider": null,
  "context_window": null,
  "capabilities": null,
  "description": null,
  "input_per_1m": null,
  "output_per_1m": null,
} satisfies ListModels200ResponseDataInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ListModels200ResponseDataInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


