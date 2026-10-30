from vlsm_utils import maskPrefix, usableBits, subnetMask, full_length_mask, calcVlsm
from ip_utils import maxPossibleHosts

def gatherData(n_subredes:int):
    array_subredes = []
    if n_subredes == 0:
        return "Numero de subredes no valido"
    else:
        contador = n_subredes
        while contador > 0:
            hosts_subred = int(input("Coloca el numero de hosts de la subred: "))
            array_subredes.append(hosts_subred)
            contador = contador - 1
    return array_subredes


def createData(subredes:list): 
    subredes.sort(reverse=True)
    total_hosts= sum(subredes)

    possible_hosts = []
    bits_usables=[]
    prefijos_subredes=[]
    mascaras=[]
    full_masks = []
    for subred in subredes:
        max_possible_hosts = maxPossibleHosts(subred)
        mask_prefix = maskPrefix(subred)
        usable_bits = usableBits(subred)
        subnets_masks = subnetMask(mask_prefix)
        fullmasks = full_length_mask(mask_prefix)

        possible_hosts.append(max_possible_hosts)
        prefijos_subredes.append(mask_prefix)
        bits_usables.append(usable_bits)
        mascaras.append(subnets_masks)
        full_masks.append(fullmasks)
        
    vlsm = calcVlsm(bits_usables, subredes)
    
    subredesVlsm = []
    # Objeto final de datos 

    for n_host, p_host , prefijo, mascara, rango in zip(subredes, possible_hosts ,prefijos_subredes, full_masks, vlsm):
        subredData = {
            "id": len(subredesVlsm) + 1,
            "hosts_posibles": p_host,
            "numero_hosts": n_host,
            "prefijo_red": prefijo,
            "mascara": mascara,
            "rango": rango
        }
        # print(prefijo, mascara, rango)
        subredesVlsm.append(subredData)

    return subredesVlsm


# Funcion showData
