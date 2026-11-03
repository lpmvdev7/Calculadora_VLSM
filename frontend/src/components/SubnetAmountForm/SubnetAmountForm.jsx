import Button from '../Button/Button'
import './SubnetAmountForm.css'
function SubnetAmountForm(){
    return(
        <>
            <div class="saf-container">
                <h1>Cuantas subredes quieres calcular?</h1>
                <div>
                    <span>Coloca el numero de subredes</span>
                    <input type="number" />
                </div>
                <Button text={"Siguiente"}></Button>
            </div>

        </>
    )
}

export default SubnetAmountForm