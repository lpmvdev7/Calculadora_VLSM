from ip_utils import total_ipv4_hosts, convertToIpFormat
from binary_utils import decimalConversion

# Funcion para calcular el prefijo de red
def maskPrefix(number_hosts:int)->int:
    ipv4_max_length=32
    bits_utilizables = 0
    for hosts in total_ipv4_hosts():
        if number_hosts <= hosts["total_hosts"]:
            bits_utilizables = hosts["bits"]
            break
    mask_prefix=ipv4_max_length - bits_utilizables
    return mask_prefix


def subnetMask(usable_bits:int):
    ipv4_limits = [8,16,24,32]

    unos_colocar = 0
    binary_mask = [0]*8

    for n in ipv4_limits:
        operacion = usable_bits - n

        if operacion == 0:
            binary_mask = [1]*8
            break
        elif operacion <= 8:
            unos_colocar = operacion
            break

    if unos_colocar > 0:
        for index, cero in enumerate(binary_mask):
            if unos_colocar == 0:
                break

            binary_mask[index] = 1
            unos_colocar -= 1

    mascara = decimalConversion(binary_mask)


    return mascara


def full_length_mask(prefijo:int):

    if prefijo > 32:
        raise ValueError("El prefijo no puede ser mayor a 32")

    # Solucion temporal para mascaras con prefijos gigantescos
    if prefijo < 8:
        primer_octeto = 256 - 2 ** (8 - prefijo)
        mask = [primer_octeto, 0, 0, 0]
        return convertToIpFormat(mask)

    ipv4_limits = [8,16,24,32]
    resultados_operaciones = []
    for index, numero in enumerate(ipv4_limits):
        operacion = prefijo - numero
        objeto = {
            "indice": index,
            "prefijo_base": numero,
            "operacion_resultado": operacion,
            "prefijo": prefijo
        }
        resultados_operaciones.append(objeto)

    resultados_mayorCero = []
    for objeto in resultados_operaciones:
        if objeto["operacion_resultado"] == 0:
            value = objeto["indice"] + 1
            mask = [255] * value

            size = len(mask)
            while size < 4:
                mask.append(0)
                size += 1 

            # return mask
            return convertToIpFormat(mask)

    ## Armar mascaras dinamicas de 8, 16, 24, 32
        if objeto["operacion_resultado"] > 0:
            new_object = {
                "resultado": objeto["operacion_resultado"],
                "indice_prefijo_base": objeto["indice"]
            }
            resultados_mayorCero.append(new_object)

    if len(resultados_mayorCero) > 0:
        resultados_minimos = []
        for resultado in resultados_mayorCero:
            resultados_minimos.append(resultado["resultado"])

        minimo = min(resultados_minimos)

        mask = []
        prefix = subnetMask(prefijo)
        for resultado in resultados_mayorCero:
            if minimo == resultado["resultado"]:
                value = resultado["indice_prefijo_base"] + 1
                mask = [255] * value
                mask.append(prefix)

        size = len(mask)

        while size < 4:
            mask.append(0)
            size += 1 
        # return mask 
        return convertToIpFormat(mask)