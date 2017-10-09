module.exports = {
  get: (req, res, next) => {
    const dbInstance=req.app.get('db');

    dbInstance.get_users()
.then( users => res.status(200).send( users ))
.catch( () => res.status(500).send());
  }
}
