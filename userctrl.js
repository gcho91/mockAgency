module.exports = {
  getUsers: (req, res, next) => {
    const dbInstance=req.app.get('db');
    dbInstance.get_users()
      .then( users => {
        res.status(200).send( users )
      })
      .catch( err => {
        res.status(500).send( err );
      })
  },

  getClients: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.get_clients()
    .then( users => res.status(200).send( users ))
    .catch( () => res.status(500).send());
  },

  updateUser: (req, res, next) => {
    const dbInstance = req.app.get('db');
    console.log('server form:',req.body);
    dbInstance.update_user([req.body])
    .then( user => res.status(200).send( user ))
    .catch( err => res.status(500).send( err ));
  }
}
