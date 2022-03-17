import { useRouter } from 'next/router'
import {userById} from '@lib/db'

export default function Users(req, res) {
    console.log(req.query)
    const id = req.query.id

    userById(id).then((user) => {
        console.log(user)
        res.status(200).json(user)
    }).catch()
}