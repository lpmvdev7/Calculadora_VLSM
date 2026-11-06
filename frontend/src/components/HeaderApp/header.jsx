import { Link } from 'react-router'
import './header.css'
function HeaderApp() {
    return (
        <Link to={"/"} className='container-header'>
            <div class="container-header">
                <h1 class="container-h1">VLSM</h1>
            </div>
        </Link>
    )
}

export default HeaderApp