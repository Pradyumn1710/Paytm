// import { Appbar } from "../mycomponents/Appbar"
import { Balance } from "../mycomponents/Balance"
import  Users  from "../mycomponents/Users"
import Test from '../mycomponents/Appbar'

export const Dashboard = () => {
    return <div>
        {/* <Appbar/> */}
        <Test></Test>
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}