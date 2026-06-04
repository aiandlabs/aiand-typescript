# OpenaiApi

All URIs are relative to *https://api.aiand.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createChatCompletion**](OpenaiApi.md#createchatcompletionoperation) | **POST** /v1/chat/completions | Create a chat completion |
| [**createCompletion**](OpenaiApi.md#createcompletionoperation) | **POST** /v1/completions | Create a completion |
| [**createResponse**](OpenaiApi.md#createresponseoperation) | **POST** /v1/responses | Create a response |
| [**listModels**](OpenaiApi.md#listmodels) | **GET** /v1/models | List models |



## createChatCompletion

> CreateChatCompletionResponse createChatCompletion(createChatCompletionRequest)

Create a chat completion

Creates a chat completion for the provided messages and parameters.

### Example

```ts
import {
  Configuration,
  OpenaiApi,
} from '@aiand/sdk';
import type { CreateChatCompletionOperationRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OpenaiApi(config);

  const body = {
    // CreateChatCompletionRequest | The request body for the chat completion (optional)
    createChatCompletionRequest: ...,
  } satisfies CreateChatCompletionOperationRequest;

  try {
    const data = await api.createChatCompletion(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createChatCompletionRequest** | [CreateChatCompletionRequest](CreateChatCompletionRequest.md) | The request body for the chat completion | [Optional] |

### Return type

[**CreateChatCompletionResponse**](CreateChatCompletionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **402** | Insufficient Credits |  -  |
| **403** | Forbidden |  -  |
| **429** | Rate Limited |  -  |
| **500** | Internal Server Error |  -  |
| **502** | Bad Gateway |  -  |
| **504** | Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCompletion

> CreateCompletionResponse createCompletion(createCompletionRequest)

Create a completion

Creates a completion for the provided prompt and parameters. This is a legacy endpoint — use /v1/chat/completions for new integrations.

### Example

```ts
import {
  Configuration,
  OpenaiApi,
} from '@aiand/sdk';
import type { CreateCompletionOperationRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OpenaiApi(config);

  const body = {
    // CreateCompletionRequest | The request body for the completion (optional)
    createCompletionRequest: ...,
  } satisfies CreateCompletionOperationRequest;

  try {
    const data = await api.createCompletion(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCompletionRequest** | [CreateCompletionRequest](CreateCompletionRequest.md) | The request body for the completion | [Optional] |

### Return type

[**CreateCompletionResponse**](CreateCompletionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **402** | Insufficient Credits |  -  |
| **403** | Forbidden |  -  |
| **429** | Rate Limited |  -  |
| **500** | Internal Server Error |  -  |
| **502** | Bad Gateway |  -  |
| **504** | Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createResponse

> CreateResponseResponse createResponse(createResponseRequest)

Create a response

Creates a response for the provided input and parameters.

### Example

```ts
import {
  Configuration,
  OpenaiApi,
} from '@aiand/sdk';
import type { CreateResponseOperationRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OpenaiApi(config);

  const body = {
    // CreateResponseRequest | The request body for the response. (optional)
    createResponseRequest: ...,
  } satisfies CreateResponseOperationRequest;

  try {
    const data = await api.createResponse(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createResponseRequest** | [CreateResponseRequest](CreateResponseRequest.md) | The request body for the response. | [Optional] |

### Return type

[**CreateResponseResponse**](CreateResponseResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **402** | Insufficient Credits |  -  |
| **403** | Forbidden |  -  |
| **429** | Rate Limited |  -  |
| **500** | Internal Server Error |  -  |
| **502** | Bad Gateway |  -  |
| **504** | Gateway Timeout |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listModels

> ListModels200Response listModels()

List models

Lists all active models with pricing.

### Example

```ts
import {
  Configuration,
  OpenaiApi,
} from '@aiand/sdk';
import type { ListModelsRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new OpenaiApi(config);

  try {
    const data = await api.listModels();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ListModels200Response**](ListModels200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

