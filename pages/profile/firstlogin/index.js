import { useSession, getSession} from "next-auth/react"
import Metatags from '@components/metatags'
import React from "react"
import style from '@styles/forms.module.css'
import {useRouter} from 'next/router'

class UsernameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', valid: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(event) {
        console.log(/^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+/.test(this.state.value))
        this.setState({value: event.target.value, valid: /^(?=.{8,20}$)(?!.*[_.]{2})[a-zA-Z0-9._]+/.test(this.state.value)});
      }
    
      handleSubmit(event) {
        event.preventDefault()
        getSession().then(data => {
            const result = fetch('/api/users/' + data.userId + '?setUsername=' + this.state.value)
            if (result.ok) {
                useRouter.push('/dashboard')
            }
        })
      }

    render() {
        let message;
        if (!this.state.valid && this.state.value.length > 0){
            message = "invalid username"
        }

        return (
            <>
                <div className={style.container}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username:
                        <input className={style.textinput} type="text" value={this.state.value} onChange={this.handleChange} />
                        <h1 className={style.errorMessage}>
                            {message}
                        </h1>
                    </label>
                    
                        <input className={style.submit} type="submit" value="Submit"/>
                </form>
            </div>
        </>
        )
    }
}





export default function firstLogon() {
    const {status} = useSession({required: true})
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    return (
        <>
            <Metatags title="choose a username" description="choose a username"/>
            <UsernameForm/>
        </>
    )
}