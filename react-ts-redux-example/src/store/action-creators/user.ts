import { UserActionTypes, UserAction } from '../../types/user'
import { Dispatch } from 'react'
import axios from 'axios'


export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionTypes.FETCH_USERS})
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(()=>{
                dispatch({
                    type: UserActionTypes.FETCH_USERS_SUCCESS, 
                    payload: response.data
                })
            }, 2000)
        }catch(e){
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR, 
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}