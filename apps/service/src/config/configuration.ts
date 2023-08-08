export default () => {
  const { SERVER_PORT = '10086', MONGO_URL, MONGO_USER, MONGO_PASS } = process.env

  return {
    port: Number.parseInt(SERVER_PORT, 10),
    mongo: {
      url: `mongodb://${MONGO_URL}`,
      option: {
        user: MONGO_USER,
        pass: MONGO_PASS
      }
    }
  }
}
