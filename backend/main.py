import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from data_utils import createData

load_dotenv() 
FRONTEND_URL = os.getenv("FRONTEND_URL")


app = FastAPI()
# origins = [
#     f"http://localhost:{FRONTEND_PORT}",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

calculo = []


@app.post("/vlsm", tags=["Calculo de VLSM"])
async def calcularVLSM(n_subredes:int, n_hosts:list[int]):
    global calculo
    array_subredes = []
    if n_subredes == 0:
        # raise ValueError("Coloca un numero mayor a cero")
        raise HTTPException(
            status_code=400,
            detail="Coloca un numero mayor a cero"
        )
    
    if len(n_hosts) != n_subredes:
        # raise ValueError("La lista no coincide con las redes a calcular")
        raise HTTPException(
            status_code=400,
            detail="El tamaño de la lista no coincide con el numero de subredes"
        )
    else:
        for host in n_hosts:
            array_subredes.append(host)

    vlsm = createData(array_subredes)

    calculo = vlsm

    return vlsm

@app.get("/vlsm", tags=["Consulta de VLSM"])
async def obtenerVLSM():
    return calculo


# numero_subredes=int(input("¿Cuantas subredes quieres calcular?: "))
# info = gatherData(numero_subredes)
# data = createData(info)
# print(data)
