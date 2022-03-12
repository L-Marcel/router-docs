function getInfo(message: string) {
  if(process.env.NODE_ENV?.trim() === "dev") {
    console.log(`[\x1b[36mINFO\x1b[0m] \x1b[30m\x1b[1m${new Date().toLocaleTimeString()}\x1b[0m ${message}`);
  };
};

export { getInfo };