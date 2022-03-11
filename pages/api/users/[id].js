import { useRouter } from 'next/router'
import db from '@lib/db'

function Users() {
    const router = useRouter()
    const {id} = router.query
    if (id.match() != id) return (<p>Not Valid UUID</p>)

    let data = {}
    db.userById(id).then((user) => {
        data = user
        console.log(typeof(data))
    }).catch(console.log)
    return data
}