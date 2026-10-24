# Creamos una lista dinamica para usarla como tabla de conversion decimal a binaria
def createDecimalList():
    decimals=[]
    initial_number=1
    current_number=0
    max_number = 128
    decimals.append(1)
    while current_number != max_number:
        operation=initial_number*2
        current_number=operation
        decimals.append(current_number)
        initial_number=current_number
    decimals = decimals[::-1]
    return decimals

# Convertir un numero decimal a binario de 8 bits
def binaryConversion(decimalNumber):
    decimales=createDecimalList()
    array_prueba=[]
    index_array=[]
    binary_array=[0,0,0,0,0,0,0,0] #Esta parte siento que esta hardcodeada y se puede hacer mucho mejor

    if decimalNumber > sum(decimales):
        raise ValueError("El número no puede ser convertido con la configuracion actual")


    if decimalNumber in decimales:
        print("Se encuentra no es necesario hacer la conversion")
        for index, numero in enumerate(decimales):
            if numero == decimalNumber:
                binary_array[index]=1
    else:
        for indice, numero in enumerate(decimales):
            operacion= decimalNumber - numero
            if operacion >= 0:
                decimalNumber=operacion
                array_prueba.append(numero)
                index_array.append(indice)

    for indice in index_array:
        binary_array[indice] = 1

    return binary_array


# Convertir un numero binario de 8 bits a decimal
def decimalConversion(binaryNumber:list):
    decimales=createDecimalList()
    index_array=[]
    sum_array=[]
    for index, numero in enumerate(binaryNumber):
        if numero == 1:
            index_array.append(index)

    for numero in index_array:
        decimal=decimales[numero]
        sum_array.append(decimal)

    return sum(sum_array)

