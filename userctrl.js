module.exports = {
  getUsers: (req, res, next) => {
    const dbInstance=req.app.get('db');

    dbInstance.get_users()
.then( users => res.status(200).send( users ))
.catch( () => res.status(500).send());
  },

  getClients: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.get_clients()
    .then( users => res.status(200).send( users ))
    .catch( () => res.status(500).send());
  }
}
