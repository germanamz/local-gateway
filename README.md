# local-gateway
Open source local implementation of AWS Api Gateway
> Beware that no all API Gateway features are implemented

## Requirements
1. Docker
2. Image Lambdas (With their own [RIE](https://docs.aws.amazon.com/lambda/latest/dg/images-test.html#images-test-alternative))


## Installation
This project is planned to run alongside with your lambdas for this reason
its runs on its own container.

An easy way to set up with your lambdas is to use docker compose.

Example:
```yaml
version: "3.9"
services:
  gateway:
    build: .
    ports:
      - 3000:3000
    volumes:
      - ./test/config:/.localg

  lambda-a:
    build: ./test/lambda-a

  lambda-b:
    build: ./test/lambda-b
```

The `gateway` service is exporting port `3000` and it has a volume attached
the volume `/.localg` holds the server configuration files on which you can setup
the paths that you want to have on the server. For example:

```javascript
/**
 * /.localg/config.js
  */
module.exports = () => {
  return {
    routes: [ // Array of route objects
      {
        path: '/a', // The HTTP path of your resource
        host: 'lambda-a', // The docker host (normally the service name)
        method: 'GET', // The HTTP method
      },
      {
        path: '/b',
        host: 'lambda-b',
        method: 'POST',
      },
    ],
  };
};
```

You can set multiple configuration files as long they match the name pattern `.*config.js(on)?$`

> NOTE: Keep in mind that if you have multiple config files they will get merged and routes will be
> concatenated

### Customizations
You can customize some aspects of the sever using the following ENV variables:

| VAR                 | Description                                                                                                  | Default value      |
|---------------------|--------------------------------------------------------------------------------------------------------------|--------------------|
| CONFIG_DIR          | The directory on which the config files are                                                                  |           /.localg |
| CONFIG_FILE_PATTERN | The config file pattern                                                                                      | .*config\.js(on)?$ |
| REPLACE             | If the configs should be replaced by the other one, file2 will replace file1. Is empty by default and any value is considered `true` |                    |
| PORT                | Internal server port                                                                                         | 3000               |

## License
MIT
