/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
// import { getMaxListeners } from "events";


export default function Users() {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3002/api/v1/user/bulk?filter="  + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user.id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
            }} label={"Send Money"} />
        </div>
    </div>
}
// User.propTypes = {
//     user: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         firstName: PropTypes.string.isRequired,
//         lastName: PropTypes.string.isRequired,
//         email: PropTypes.string.isRequired,
//     }).isRequired,
// };

// // Define PropTypes for Users component
// Users.propTypes = {
//     users: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             firstName: PropTypes.string.isRequired,
//             lastName: PropTypes.string.isRequired,
//             email: PropTypes.string.isRequired,
//         })
//     ),
//     setFilter: PropTypes.func,
// };
