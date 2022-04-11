import {userById,changeUsername} from '@lib/db'

export default function Users(req, res) {
const id = req.query.id
if (req.method === "POST"){
    if (req.query.setUsername) {
        if (/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+/.test(req.query.setUsername)) {
            changeUsername(id,req.query.setUsername).then(res.status(200).json).catch((err) => {
                res.status(500).send("Internal Error")
            })
          }else res.status(400).send("Invalid Username")
    }
}


if (req.method === "GET"){
    userById(id).then((user) => {
        res.status(200).json(user)
    }).catch()
}
}