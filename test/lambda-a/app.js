
module.exports.handler = async (event, ctx) => {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(ctx));
  return {};
};
