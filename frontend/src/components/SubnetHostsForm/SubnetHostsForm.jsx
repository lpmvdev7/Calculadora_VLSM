import { useState } from 'react'
import Button from '../Button/Button'
import './SubnetHostsForm.css'
import { useLocation, useNavigate } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL;

function SubnetHostsForm(){
    const location = useLocation()
    const { subnetAmount } = location.state
    const navigate = useNavigate()


    // Use State
    const [numberHost, setNumberHost] = useState(Array(subnetAmount).fill(""))
    const page = "/dashboard"

    const inputs = []

    for (let index = 0; index < subnetAmount; index++) {
        inputs.push(
            <div>
                <label>Hosts subred  {index + 1}</label>
                <input 
                    type="number" 
                    name="" 
                    id=""
                    required
                    onChange={(e)=>{
                        const newArray=[...numberHost]
                        newArray[index] = Number(e.target.value)
                        setNumberHost(newArray)
                    }}
                    />
            </div>
        )
    }

    async function navigateToDashboard(e) {
        e.preventDefault()

        const hosts = numberHost.map(Number)

        try {
            const response = await fetch(
                `${API_URL}/vlsm?n_subredes=${subnetAmount}`,
                {
                    method: "POST",
                    headers: {
                        "accept": "*/*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(hosts)
                }
            )

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`)
            }

            const result = await response.json()

            console.log("Resultado VLSM:", result)

            navigate("/dashboard", {
                state: {
                    subnetAmount: subnetAmount,
                    hosts: hosts,
                    results: result
                }
            })

        } catch (error) {
            console.error("Error al ejecutar el cálculo VLSM:", error)
        }
    }

    return(
            <form action="" className="shf-container" onSubmit={navigateToDashboard}>
                <h1>
                    Coloca el numero de hosts por cada subred
                </h1>
                <section>
                    {inputs}
                </section>
                <Button text={"Calcular"}></Button>
            </form>
    )
}

export default SubnetHostsForm
