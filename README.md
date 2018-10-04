# iot-edge-httpclient
An Edge module provides direct method for HTTP Requests (Axios)

## Direct Method

- Method: `request`
  - Request
  Same as Axios `config` object, Please check https://github.com/axios/axios#request-config for full desciption.
    - Payload
      ```json
      {
        "url": "https://localhost/api/v1/network/ethernet/1",
        "method": "get"
      }
      ```

  - Response
    - Payload
      ```json
      {
        "data": axiosResponse.data,
        "status": axiosResponse.status,
        "statusText": axiosResponse.statusText,
      }
      ```
    - Code
      - 999 for method error
      - others for http status code

## Module Twin

```json
{
}
```
