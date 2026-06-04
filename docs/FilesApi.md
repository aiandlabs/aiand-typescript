# FilesApi

All URIs are relative to *https://api.aiand.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deleteFile**](FilesApi.md#deletefile) | **DELETE** /v1/files/{id} | Delete a file |
| [**getFile**](FilesApi.md#getfile) | **GET** /v1/files/{id} | Retrieve a file |
| [**getFileContent**](FilesApi.md#getfilecontent) | **GET** /v1/files/{id}/content | Download file content |
| [**listFiles**](FilesApi.md#listfiles) | **GET** /v1/files | List files |
| [**uploadFile**](FilesApi.md#uploadfile) | **POST** /v1/files | Upload a file |



## deleteFile

> FileDeleted deleteFile(id)

Delete a file

Soft-deletes the file row and best-effort removes the underlying R2 object.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '@aiand/sdk';
import type { DeleteFileRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies DeleteFileRequest;

  try {
    const data = await api.deleteFile(body);
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

[**FileDeleted**](FileDeleted.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The deleted file marker |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFile

> FileObject getFile(id)

Retrieve a file

Returns metadata for a single file.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '@aiand/sdk';
import type { GetFileRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies GetFileRequest;

  try {
    const data = await api.getFile(body);
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

[**FileObject**](FileObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The file\&#39;s metadata |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getFileContent

> Blob getFileContent(id)

Download file content

Returns the raw bytes with &#x60;Content-Type&#x60; and &#x60;Content-Disposition&#x60; headers set from the upload metadata.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '@aiand/sdk';
import type { GetFileContentRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies GetFileContentRequest;

  try {
    const data = await api.getFileContent(body);
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

**Blob**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The file bytes |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listFiles

> FileList listFiles()

List files

Returns files in reverse-chronological order (newest first).

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '@aiand/sdk';
import type { ListFilesRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  try {
    const data = await api.listFiles();
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

[**FileList**](FileList.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Paginated list of files |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## uploadFile

> FileObject uploadFile(file, purpose)

Upload a file

Multipart form upload.

### Example

```ts
import {
  Configuration,
  FilesApi,
} from '@aiand/sdk';
import type { UploadFileRequest } from '@aiand/sdk';

async function example() {
  console.log("🚀 Testing @aiand/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FilesApi(config);

  const body = {
    // Blob | The asset bytes (multipart/form-data field)
    file: BINARY_DATA_HERE,
    // string | One of `vision`, `video`, `audio`, or `document`. Determines size + mime limits and which models can reference the file. Optional — if omitted, inferred from the file\\\'s MIME type. (optional)
    purpose: purpose_example,
  } satisfies UploadFileRequest;

  try {
    const data = await api.uploadFile(body);
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
| **file** | `Blob` | The asset bytes (multipart/form-data field) | [Defaults to `undefined`] |
| **purpose** | `vision`, `video`, `audio`, `document` | One of &#x60;vision&#x60;, &#x60;video&#x60;, &#x60;audio&#x60;, or &#x60;document&#x60;. Determines size + mime limits and which models can reference the file. Optional — if omitted, inferred from the file\\\&#39;s MIME type. | [Optional] [Defaults to `undefined`] [Enum: vision, video, audio, document] |

### Return type

[**FileObject**](FileObject.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The uploaded file\&#39;s metadata |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized |  -  |
| **403** | Forbidden |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

