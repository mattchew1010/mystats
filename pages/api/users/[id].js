import { useRouter } from 'next/router'
import {firebase} from '../../../lib/firebase'

export default function user(req,res) {
    const router = useRouter();
    const {id} = router.query

    const collection = firestore.collection('usernames');
    const result = usersRef.where('uid', '==', id).limit(1);

    if (result) {
        res.status(200).json({uid: result})
    }else {
        res.status(500).json({ error: 'failed to load data' })
    }
}