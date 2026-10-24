from binary_utils import decimalConversion

def total_ipv4_hosts():
    total_hosts = []
    for i in range(1,33):
        network_size = {
            "bits": i,
            "total_hosts":(2**i)-2
        }
        total_hosts.append(network_size)
    return total_hosts

# Funcion para calcular el prefijo de red
def maskPrefix(number_hosts:int)->int:
    ipv4_max_length=32
    bits_utilizables = 0
    for hosts in total_ipv4_hosts():
        if number_hosts < hosts["total_hosts"]:
            bits_utilizables = hosts["bits"]
            break
    mask_prefix=ipv4_max_length - bits_utilizables
    return mask_prefix

# Funcion que retorna un array con los bits que utilizara una subred
def usableBits(number_hosts:int):
    usable_bit = 0
    for hosts in total_ipv4_hosts():
        if number_hosts < hosts["total_hosts"]:
            usable_bit = hosts["bits"]
            break
    return usable_bit


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

            return mask

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
        return mask


def calcVlsm(bits:list[int], hosts:list[int]):
    total = sum(hosts)
    ceros_amount = 0
    octeto = 8

    # Array de objetos que guardara los rangos de red
    resultados = []

    if total <= 254:
        # Clase C
        ceros_amount = 2
    elif total > 254 and total <= 65534:
        # Clase B
        ceros_amount = 2
    elif total > 65534 and total <= 16777214:
        #Clase C
        ceros_amount = 3

    calc_size = octeto * ceros_amount
    calc_array = [0] * calc_size

    subred = {
        "inicio": [],
        "fin": []
    }

    if len(resultados) == 0:
        # subred = {
        #     "inicio": [],
        #     "fin": []
        # }
        contador = 0
        while contador != bits[0]:
            calc_array[contador] = 1
            contador = contador +1

    # Volteamos el array calculado
    new = calc_array[::-1]
    
    # Basado en el numero de ceros disponibles por calculo dividimos el array
    # Calculo para el primer rang de direcciones
    if ceros_amount == 2:
        subred["inicio"] = [0] * ceros_amount
        new_uno = new[:8]
        new_two = new[8:]
        # Los convertimos a decimales
        subred["fin"].append(decimalConversion(new_uno))
        subred["fin"].append(decimalConversion(new_two))        
        resultados.append(subred)
    elif ceros_amount == 3:
        subred["inicio"] = [0] * ceros_amount
        new_uno = new[0:8]
        new_two = new[8:16]
        new_three = new[16:24]
        subred["fin"].append(decimalConversion(new_uno))
        subred["fin"].append(decimalConversion(new_two))
        subred["fin"].append(decimalConversion(new_three))
        resultados.append(subred)

    # Eliminamos el elemento con el que calculamos el primer rango de subredes
    bits.pop(0)

    
    # Calculo para el rango restante de direcciones    
    for resultado in resultados:
        first_range = []
        # Calculos de VLSM en caso de que estemos frente a una clase B y C
        if len(resultado["fin"]) == 2:
            last_position = len(resultado["fin"]) - 1

            if resultado["fin"][last_position] == 255:
                # Calculo del siguiente primer rango en caso que el ultimo octeto del ultimo rango sea igual a a 255
                new_value = resultado["fin"][0] + 1
                another_value = 0
                first_range.append(new_value)
                first_range.append(another_value)
                print(first_range)
            else: 
                new_value = resultado["fin"][last_position] + 1
                another_value = resultado["fin"][0]
                first_range.append(another_value)
                first_range.append(new_value)
                print(first_range)

                

        # Calculo de rangos de ip en caso de que estemos frente a una Clase  A
        elif len(resultado["fin"]) ==3:
            last_position = len(resultado["fin"]) - 1

            if resultado["fin"][last_position] == 255:
                print("limite maximo")
                # Aqui aplicaremos una logica distinta


# Clase b
# calcVlsm([10,10,9,9],[547, 522, 327, 445])


# calcVlsm([7,7,6,4],[95,75,40,10])

# Clase A
# calcVlsm([16,16,17,19,20],[50000, 45000, 32050, 6750, 3250])

# Clase C
calcVlsm([7,7,6,6,3],[12,30,57,75,75])