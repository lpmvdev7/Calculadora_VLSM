import Button from '../Button/Button'
import './SubnetHostsForm.css'
function SubnetHostsForm(){
    return(
            <form action="" class="shf-container">
                <h1>
                    Coloca el numero de hosts por cada subred
                </h1>
                <section>
                    <div>
                        <label>Hosts subred 1</label>
                        <input type="number" name="" id=""/>
                    </div>
                    <div>
                        <label>Hosts subred 2</label>
                        <input type="number" name="" id=""/>
                    </div>
                    <div>
                        <label>Hosts subred 3</label>
                        <input type="number" name="" id=""/>
                    </div>
                    <div>
                        <label>Hosts subred 4</label>
                        <input type="number" name="" id=""/>
                    </div>
                </section>
                <Button text={"Calcular"}></Button>
            </form>
    )
}

export default SubnetHostsForm
