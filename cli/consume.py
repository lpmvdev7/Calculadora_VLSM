import requests 
import os

BASE_API_URL = "http://backend:3000/vlsm"
#BASE_API_URL = os.getenv(
 #   "VLSM_API_URL",
  #  "http://localhost:3000/vlsm"
#)

def post_vlsm(n, n_hosts):
    params = {
        "n_subredes": n
    }
    headers = {
    "accept": "*/*",
    "Content-Type":"application/json"
    }
    payload = n_hosts
    response = requests.post(BASE_API_URL, params=params, headers=headers, json=payload)

    return response.json()

def get_vlsm():
    rq = requests.get(BASE_API_URL)
    return rq.json()


# usuario = int(input("Cuantas subredes quieres calcular?: "))
# na_hosts = []
# while(usuario > 0):
#     n_redes = int(input("Coloca el numero de hosts: "))
#     na_hosts.append(n_redes)
#     usuario = usuario - 1

# post_vlsm(usuario, na_hosts)
# print(get_vlsm())
