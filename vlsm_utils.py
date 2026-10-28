from binary_utils import decimalConversion, binaryConversion

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


# Funcion que calcula el VLSM
def calcVlsm(bits:list[int], hosts:list[int]):
    total = sum(hosts)
    ceros_amount = 0
    octeto = 8
    ip_class_number = []

    # Array de objetos que guardara los rangos de red
    resultados = []

    if total <= 254:
        # Clase C
        ceros_amount = 2
        ip_class_number = [192,168]

    elif total > 254 and total <= 65534:
        # Clase B
        ceros_amount = 2
        ip_class_number = [172,16]

    elif total > 65534 and total <= 16777214:
        #Clase C
        ceros_amount = 3
        ip_class_number = [10]

    calc_size = octeto * ceros_amount
    
    # Array inicial que utilizaremos para realizar todos nuestros calculos
    calc_array = [0] * calc_size



    current_calc_array = calc_array
    for bit in bits:
        rango_inicial = []
        rango_final = []
        subred = {
            "Inicio":rango_inicial,
            "Fin": rango_final
        }

        first_range = current_calc_array
        primera_division = len(first_range) / octeto
        if primera_division == 2:
            # Clase B y C
            ordenamiento = first_range[::-1]
            numero_uno = decimalConversion(ordenamiento[:8])
            numero_dos = decimalConversion(ordenamiento[8:])

            for numero in ip_class_number:
                rango_inicial.append(numero)

            rango_inicial.append(numero_uno)
            rango_inicial.append(numero_dos)
        elif primera_division == 3:
            # Clase A
            ordenamiento = first_range[::-1]
            numero_uno = decimalConversion(ordenamiento[:8])
            numero_dos = decimalConversion(ordenamiento[8:16])
            numero_tres = decimalConversion(ordenamiento[16:24])

            for numero in ip_class_number:
                rango_inicial.append(numero)
            
            rango_inicial.append(numero_uno)
            rango_inicial.append(numero_dos)
            rango_inicial.append(numero_tres)


        # Colocamos los uno conforme a los bits usados
        contador = 0
        while contador != bit:
            current_calc_array[contador] = 1
            contador= contador + 1

        final_range = current_calc_array[::-1]
        segunda_division = len(final_range) / octeto
        if segunda_division == 2:
            numero_uno = decimalConversion(final_range[:8])
            numero_dos = decimalConversion(final_range[8:])

            for numero in ip_class_number:
                rango_final.append(numero)

            rango_final.append(numero_uno)
            rango_final.append(numero_dos)


            if numero_dos < 255:
                new_numero_uno = numero_uno
                new_numero_dos = numero_dos + 1
                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                next_array = binary_uno + binary_dos
                current_calc_array = next_array[::-1]
            elif numero_dos == 255:
                new_numero_uno = numero_uno + 1
                new_numero_dos = 0
                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                next_array = binary_uno + binary_dos
                current_calc_array = next_array[::-1] # Verificar esto


        elif segunda_division == 3: #Aqui comienza la logica de la Clase A
            array_uno = final_range[:8]
            array_dos= final_range[8:16]
            array_tres= final_range[16:24]
            numero_uno = decimalConversion(array_uno)
            numero_dos = decimalConversion(array_dos)
            numero_tres = decimalConversion(array_tres)

            for numero in ip_class_number:
                rango_final.append(numero)

            rango_final.append(numero_uno)
            rango_final.append(numero_dos)
            rango_final.append(numero_tres)
            # print(rango_final)

            if numero_tres == 255 and numero_dos == 255:
                new_numero_uno = numero_uno + 1
                new_numero_dos = 0
                new_numero_tres = 0
                # print(new_numero_uno, new_numero_dos, new_numero_tres)

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres
                current_calc_array = next_array[::-1]
            elif numero_tres < 255 and numero_dos < 255:
                new_numero_uno = numero_uno 
                new_numero_dos = numero_dos + 1
                new_numero_tres = numero_tres + 1
                # print(new_numero_uno, new_numero_dos, new_numero_tres)

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres
                current_calc_array = next_array[::-1]
            elif numero_tres == 255 and numero_dos < 255:
                new_numero_uno = numero_uno
                new_numero_dos = numero_dos + 1
                new_numero_tres = 0
                # print(new_numero_uno, new_numero_dos, new_numero_tres)

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres
                current_calc_array = next_array[::-1]
            elif numero_tres < 255 and numero_dos == 255:
                new_numero_uno = numero_uno + 1
                new_numero_dos = 0
                new_numero_tres = numero_tres + 1

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres
                current_calc_array = next_array[::-1]

           
        resultados.append(subred)



    return resultados
