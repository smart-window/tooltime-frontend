# Tooltime-consumer

## To deploy to S3 as a Static Website, follow the below Steps.

1. in serverless.yml set provider.environment.VUE_APP_API_URL to the correct endpoint
2. In a future update, the script will obtain this value from another CloudFormation stack automatically
3. \$ npm run build
4. \$ sls deploy

## To remove the stack (and stop billing)

1. sls remove

## Project setup

```
yarn install

yarn serve
```


- Test credentials
  ```
  email: oliver@tt.com
  password: a

  email: william@tt.com
  password: a
  ```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
