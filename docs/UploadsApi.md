# UploadsApi

All URIs are relative to *https://api.aiand.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addUploadPart**](UploadsApi.md#adduploadpart) | **POST** /v1/uploads/{id}/parts | Add a part to an upload |
| [**cancelUpload**](UploadsApi.md#cancelupload) | **POST** /v1/uploads/{id}/cancel | Cancel an upload |
| [**completeUpload**](UploadsApi.md#completeuploadoperation) | **POST** /v1/uploads/{id}/complete | Complete an upload |
| [**createUpload**](UploadsApi.md#createuploadoperation) | **POST** /v1/uploads | Create an upload session |



## addUploadPart

> UploadPartObject addUploadPart(id, data)

Add a part to an upload

Uploads up to 64 MB of bytes as one part of a pending session. Parts must be added in order — completing the upload submits them in the order returned to the client.

### Example

```ts
import {
  Configuration,
  UploadsApi,
} from '@aiand/sdk';
import type { AddUploadPartRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UploadsApi(config);

  const body = {
    // string
    id: id_example,
    // Blob | Bytes for this part (multipart/form-data field), max 64 MB
    data: BINARY_DATA_HERE,
  } satisfies AddUploadPartRequest;

  try {
    const data = await api.addUploadPart(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **data** | `Blob` | Bytes for this part (multipart/form-data field), max 64 MB | [Defaults to `undefined`] |

### Return type

[**UploadPartObject**](UploadPartObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The part record |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cancelUpload

> UploadObject cancelUpload(id)

Cancel an upload

Aborts the underlying R2 multipart upload and marks the session &#x60;cancelled&#x60;. Idempotent — already-completed or already-cancelled sessions return 404.

### Example

```ts
import {
  Configuration,
  UploadsApi,
} from '@aiand/sdk';
import type { CancelUploadRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UploadsApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies CancelUploadRequest;

  try {
    const data = await api.cancelUpload(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**UploadObject**](UploadObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The cancelled upload |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## completeUpload

> UploadObject completeUpload(id, completeUploadRequest)

Complete an upload

Assembles the listed parts in order and materializes the upload as a regular &#x60;file-...&#x60; object referenced via the returned &#x60;file&#x60; field.

### Example

```ts
import {
  Configuration,
  UploadsApi,
} from '@aiand/sdk';
import type { CompleteUploadOperationRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UploadsApi(config);

  const body = {
    // string
    id: id_example,
    // CompleteUploadRequest | Ordered part_ids to assemble (optional)
    completeUploadRequest: ...,
  } satisfies CompleteUploadOperationRequest;

  try {
    const data = await api.completeUpload(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **completeUploadRequest** | [CompleteUploadRequest](CompleteUploadRequest.md) | Ordered part_ids to assemble | [Optional] |

### Return type

[**UploadObject**](UploadObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The completed upload, with &#x60;file&#x60; populated |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createUpload

> UploadObject createUpload(createUploadRequest)

Create an upload session

Creates a chunked upload session for files larger than the single-shot &#x60;/v1/files&#x60; cap. Sessions expire 1 hour after creation.

### Example

```ts
import {
  Configuration,
  UploadsApi,
} from '@aiand/sdk';
import type { CreateUploadOperationRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UploadsApi(config);

  const body = {
    // CreateUploadRequest | Upload metadata declared up front (optional)
    createUploadRequest: ...,
  } satisfies CreateUploadOperationRequest;

  try {
    const data = await api.createUpload(body);
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
| **createUploadRequest** | [CreateUploadRequest](CreateUploadRequest.md) | Upload metadata declared up front | [Optional] |

### Return type

[**UploadObject**](UploadObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The upload session in &#x60;pending&#x60; status |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

