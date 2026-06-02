
# ChatCompletionMessageAnyOf2ContentAnyOfInner


## Properties

Name | Type
------------ | -------------
`type` | string
`text` | string
`image_url` | [ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOfImageUrl](ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOfImageUrl.md)
`video_url` | [ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf1VideoUrl](ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf1VideoUrl.md)
`input_audio` | [ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf2InputAudio](ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf2InputAudio.md)
`audio_url` | [ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf1VideoUrl](ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf1VideoUrl.md)
`file` | [ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf4File](ChatCompletionMessageAnyOf2ContentAnyOfInnerAnyOf4File.md)

## Example

```typescript
import type { ChatCompletionMessageAnyOf2ContentAnyOfInner } from '@aiand/sdk'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "text": null,
  "image_url": null,
  "video_url": null,
  "input_audio": null,
  "audio_url": null,
  "file": null,
} satisfies ChatCompletionMessageAnyOf2ContentAnyOfInner

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ChatCompletionMessageAnyOf2ContentAnyOfInner
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


