declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'; // 例如，指定 NODE_ENV 的值只能是这三种之一

    // app
    SERVER_PORT: string

    // database
    MONGO_URL: string
    MONGO_USER: string
    MONGO_PASS: string
  }
}
