from vlsm_utils import total_ipv4_hosts, maskPrefix, usableBits, subnetMask, full_length_mask, calcVlsm

subredes=[]
bits_usables = []
prefijos_subredes=[]
mascaras = []
full_masks = []

numero_subredes=int(input("¿Cuantas subredes quieres calcular?: "))
if numero_subredes == 0:
    print("Numero de subredes no valido")
else:
    contador = numero_subredes
    while contador > 0:
        hosts_subred=int(input("Coloca el numero de hosts de la subred: "))
        subredes.append(hosts_subred)
        contador=contador-1

    # Se ordenan las redes de la mayor a la menor    
    subredes.sort(reverse=True)

    # Guardamos el numero de host totales que utilizara el usuario
    # total_hosts= sum(subredes)

    # Calculo de prefijo de mascara
    for subred in subredes:
        mask_prefix = maskPrefix(subred)
        usable_bits = usableBits(subred)
        subnets_masks = subnetMask(mask_prefix)
        fullmasks = full_length_mask(mask_prefix)

        prefijos_subredes.append(mask_prefix)
        bits_usables.append(usable_bits)
        mascaras.append(subnets_masks)
        full_masks.append(fullmasks)

    vlsm = calcVlsm(bits_usables, subredes)
        


    print(f"Subredes: {subredes}")
    print(f"Prefijos de red: {prefijos_subredes}")
    print(f"Bits a usar por cada subred: {bits_usables}")
    print(f"Mascara por cada subred:  {mascaras}")
    print(f"Mascaras completas: {full_masks}")

    for subred in vlsm:
        print(subred)
