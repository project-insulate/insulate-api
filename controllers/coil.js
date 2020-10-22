async function redirect(req, res) {
  return res.send({ status: "All Good!" });
}

module.exports = {
  redirect,
};
