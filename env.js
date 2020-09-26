module.exports = (env) => {
  const friendship = {};

  if (env === "production") {
    return {
      DB_USER: "DB_USER",
      DB_PASSWORD: "DB_PASS",
      DB_HOST: "DB_HOST",
      DB_DATABASE: "DB_NAME",
      ...friendship,
    };
  } else {
    return {
      DB_USER: "DB_USER",
      DB_PASSWORD: "DB_PASS",
      DB_HOST: "DB_HOST",
      DB_DATABASE: "DB_NAME",
      ...friendship,
    };
  }
};
