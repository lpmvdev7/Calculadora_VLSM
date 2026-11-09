import { useState } from 'react'
import Button from '../Button/Button'
import './SubnetAmountForm.css'
import { useNavigate } from 'react-router'
import NetworkBackground from '../NetworkBackground/NetworkBackground'


// function navigateToNumberHosts(){
//     return "/number-hosts"
// }

function SubnetAmountForm(){
    const [subnetAmount, setSubnetAmount] = useState(null)
    const navigate = useNavigate()
    const page = "/number-hosts"

    function navigateToNumberHosts(e){
        e.preventDefault()

        navigate(page,{
            state: {
                subnetAmount: subnetAmount
            }
        })
    }

    return(
        <>
            <form className="saf-container" onSubmit={navigateToNumberHosts}>
                <h1>Cuantas subredes quieres calcular?</h1>
                <div>
                    <span>Coloca el numero de subredes</span>
                    <input 
                        type="number"
                        value={subnetAmount}
                        onChange={(e)=> setSubnetAmount(Number(e.target.value))}
                        required 
                    />
                </div>
                <Button type='submit' text={"Siguiente"}></Button>
            </form>
        </>
    )
}

export default SubnetAmountForm