import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export {
  signup
}

function signup(req, res) {
  const user = new User(req.body)
  user.save()
  .then(user =>{
    console.log(user)
    const token = createJWT(user)
    res.status(200).json({ token })
  })
  .catch(err => {
    res.status(400).send({ err: err.errmsg })
  })
}

function createJWT(user) {
  return jwt.sign(
    process.env.SECRET,
    { expiresIN: '24h'}
  )
}
