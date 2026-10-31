from binary_utils import decimalConversion, binaryConversion
# from data_utils import convertToIpFormat
from ip_utils import total_ipv4_hosts,  convertToIpFormat


# Funcion que retorna un array con los bits que utilizara una subred
def usableBits(number_hosts:int):
    usable_bit = 0
    for hosts in total_ipv4_hosts():
        if number_hosts <= hosts["total_hosts"]:
            usable_bit = hosts["bits"]
            break
    return usable_bit

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

    # Esto es en caso de que el tamaño de la red supere el limite de la clase A
    elif total > 16777214 and total <= 4294967294:
        ceros_amount = 4

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
        # Logica para redes gigantescas que superen el Limite de la CLASE A
        elif primera_division == 4:
            # Clase D
            ordenamiento = first_range[::-1]
            numero_uno = decimalConversion(ordenamiento[:8])
            numero_dos = decimalConversion(ordenamiento[8:16])
            numero_tres = decimalConversion(ordenamiento[16:24])
            numero_cuatro = decimalConversion(ordenamiento[24:32])
            rango_inicial.append(numero_uno)
            rango_inicial.append(numero_dos)
            rango_inicial.append(numero_tres)
            rango_inicial.append(numero_cuatro)


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
        elif segunda_division == 4: # Aqui comienza la logica para las REDES mas grandes
            array_uno = final_range[:8]
            array_dos = final_range[8:16]
            array_tres = final_range[16:24]
            array_cuatro = final_range[24:32]
            numero_uno = decimalConversion(array_uno)
            numero_dos = decimalConversion(array_dos)
            numero_tres = decimalConversion(array_tres)
            numero_cuatro = decimalConversion(array_cuatro)

            rango_final.append(numero_uno)
            rango_final.append(numero_dos)
            rango_final.append(numero_tres)
            rango_final.append(numero_cuatro)

            if numero_cuatro == 255 and numero_tres == 255 and numero_dos == 255:
                new_numero_uno = numero_uno + 1
                new_numero_dos = 0
                new_numero_tres = 0
                new_numero_cuatro = 0

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
            elif numero_cuatro < 255 and numero_tres < 255 and numero_dos < 255:
                new_numero_uno = numero_uno
                new_numero_dos = numero_dos + 1
                new_numero_tres = numero_tres + 1
                new_numero_cuatro = numero_cuatro + 1

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
            elif numero_cuatro < 255 and numero_tres == 255 and numero_dos == 255:
                new_numero_uno = numero_uno
                new_numero_dos = 0
                new_numero_tres = 0
                new_numero_cuatro = numero_cuatro + 1

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
            elif numero_cuatro < 255 and numero_tres < 255 and numero_dos == 255:
                new_numero_uno = numero_uno
                new_numero_dos = 0
                new_numero_tres = numero_tres + 1
                new_numero_cuatro = numero_cuatro + 1

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
            elif numero_cuatro == 255 and numero_tres < 255 and numero_dos < 255:
                new_numero_uno = numero_uno
                new_numero_dos = numero_dos + 1
                new_numero_tres = numero_tres + 1
                new_numero_cuatro = 0

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
            elif numero_cuatro ==255 and numero_tres == 255 and numero_dos < 255:
                new_numero_uno = numero_uno
                new_numero_dos = numero_dos + 1
                new_numero_tres = 0
                new_numero_cuatro = 0

                # Conversion binaria
                binary_uno = binaryConversion(new_numero_uno)
                binary_dos = binaryConversion(new_numero_dos)
                binary_tres = binaryConversion(new_numero_tres)
                binary_cuatro = binaryConversion(new_numero_cuatro)

                # next array 
                next_array = binary_uno + binary_dos + binary_tres + binary_cuatro
                current_calc_array = next_array[::-1]
   
        resultados.append(subred)


    rangos_finales = []

    primerIp = ""
    ultimaIp = ""

    for resultado in resultados:
        rango = {
        "First": primerIp,
        "Last": ultimaIp
        }
        currentFirst = resultado["Inicio"]
        currentLast = resultado["Fin"]
        primerIp = convertToIpFormat(currentFirst)
        ultimaIp = convertToIpFormat(currentLast)

        rango["First"] = primerIp
        rango["Last"] = ultimaIp
        rangos_finales.append(rango)

    return rangos_finales